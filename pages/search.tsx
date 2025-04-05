import AnnasURL from "@/components/AnnasURL";
import Head from "next/head";
import InputSearch from "@/components/InputSearch";
import ListSection from "@/components/ListSection";
import LoaderCircle from "@/components/LoaderCircle";
import ResultsFrom from "@/components/ResultsFrom";
import SearchBanner from "@/components/banners/SearchBanner";
import TryDifferentTerms from "@/components/TryDifferentTerms";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animateOpacity, len, tLC } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { API_BOOKS, PAGES } from "@/utils/consts";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";
import { deburr, noop } from "es-toolkit";
import { FormEvent, useEffect, useState } from "react";
import { notification } from "@/utils/notifications";
import { useTranslation } from "react-i18next";
import { AuthAction, type User, useUser, withUser } from "next-firebase-auth";
import type { Book, Component } from "@/utils/types";
import { useRouter, type NextRouter } from "next/router";

const KEY = process.env.API_KEY_BOOKS as string;

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: LoaderCircle,
})(SearchPage);

function SearchPage(): Component {
  const user: User = useUser(),
    auth: Auth = getAuth(),
    router: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    [query, setQuery] = useState<string>(""),
    [queryVal, setQueryVal] = useState<string>(""),
    [showIcon, setShowIcon] = useState<boolean>(true),
    [booksResults, setBooksResults] = useState<Book[]>([]),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => animateOpacity(1, 400)),
    [stylesSec, api] = useSpring(() => animateOpacity(1, 600));

  useEffect(() => {
    if (!navigator.onLine) return;
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (!animations) return;
    api.start(animateOpacity(1, 600));
  }, [booksResults, queryVal]);

  useEffect(() => {
    if (Array.isArray(router.query.q)) return;
    const urlQuery: string = router.query.q ?? "";
    if (urlQuery) {
      setQueryVal(urlQuery);
      searchBooks(urlQuery);
    }
  }, [router.query.q]);

  async function searchBooks(searchQuery: string): Promise<void> {
    if (!searchQuery.trim()) return;
    startLoading();

    try {
      const ENDPOINT: string = `${API_BOOKS}?q=${searchQuery}&maxResults=40&key=${KEY}`,
        options: RequestInit = {
          mode: "cors",
          method: "GET",
          cache: "default",
          headers: { "Content-Type": "application/json" },
        },
        res: Response = await fetch(ENDPOINT, options),
        data = await res.json(),
        books: Book[] = (data.items || []).map((b: GoogleBook) => ({
          id: b?.id,
          data: {
            //* Slash reemplazado porque genera error en la ruta dinámica.
            title: (b?.volumeInfo?.title).replaceAll("/", "-"),
            author: b?.volumeInfo?.authors?.join(", "),
            notes: b?.volumeInfo?.description ?? "",
            gender: b?.volumeInfo?.categories?.join(", ") || "no-gender",
            image: b?.volumeInfo?.imageLinks?.thumbnail,
            url: b?.volumeInfo?.canonicalVolumeLink,
            loaned: "",
            state: "Pending",
            isFav: false,
            owner: user?.id,
          },
        }));

      const uniqueTitles: Set<string> = new Set<string>();
      const uniqueBooks: Book[] = books.filter((b: Book) => {
        const title: string = deburr(
          replaceInvalidChars(tLC(b.data.title ?? ""))
        );
        if (title && !uniqueTitles.has(title)) {
          uniqueTitles.add(title);
          return true;
        } else return false;
      });
      setBooksResults(uniqueBooks);
    } catch (err: any) {
      notification("error", t("error-search"));
      console.error(`catch 'searchBooks' ${err.message}`);
    } finally {
      finishLoading();
    }
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!query.trim()) return;
    setShowIcon(false);

    router.push(
      {
        pathname: PAGES.SEARCH,
        query: { q: query },
      },
      undefined,
      { shallow: true }
    );

    setQueryVal(query);
    setQuery("");
    searchBooks(query);
  }

  function clearResults(): void {
    setBooksResults([]);
    setQueryVal("");
    setShowIcon(true);
    router.push(PAGES.SEARCH, undefined, { shallow: true });
  }

  return (
    <animated.section
      style={styles}
      className="relative max-w-4xl w-full px-3 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 flex flex-col justify-start items-center gap-y-6 min-h-[350px]"
    >
      <Head>
        <title>Lymbrarie - {t("books-finder")}</title>
      </Head>

      {showIcon && <SearchBanner />}

      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col items-center justify-center gap-y-4 px-6 sm:px-0"
      >
        <InputSearch query={query} setQuery={setQuery} isLoading={isLoading} />
        <AnnasURL />
      </form>

      <animated.div
        style={stylesSec}
        className="w-full flex flex-col gap-y-8 items-center justify-center"
      >
        {isLoading ? (
          <LoaderCircle
            spinnerClass="text-violet-300 w-11 h-11"
            containerClass="bg-gradient-to-br from-transparent via-transparent to-transparent h-full static pt-0"
          />
        ) : (
          len(booksResults) > 0 && (
            <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-y-6">
              <ResultsFrom queryVal={queryVal} clearResults={clearResults} />
              <ListSection myBooks={booksResults} isSearch />
            </div>
          )
        )}

        {len(booksResults) == 0 && queryVal != "" && !isLoading && (
          <TryDifferentTerms />
        )}
      </animated.div>
    </animated.section>
  );
}

function replaceInvalidChars(str: string): string {
  return str.replaceAll(/[_@\/]/g, "-");
}

type GoogleBook = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language?: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    pdf: {
      isAvailable: boolean;
    };
  };
};
