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
import { animate, len, tLC } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { API_BOOKS, PAGES } from "@/utils/consts";
import { Auth, getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { AuthAction, useUser, withUser } from "next-firebase-auth";
import { deburr, noop } from "es-toolkit";
import { FormEvent, useEffect, useState } from "react";
import { notification } from "@/utils/notifications";
import { useTranslation } from "react-i18next";
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
  const user = useUser(),
    auth: Auth = getAuth(),
    router: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    [query, setQuery] = useState(""),
    [queryVal, setQueryVal] = useState<string>(""),
    [showIcon, setShowIcon] = useState<boolean>(true),
    [booksResults, setBooksResults] = useState<Book[]>([]),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => animate(0, 1, 400)),
    [stylesSec, api] = useSpring(() => animate(0, 1, 600));

  useEffect(() => {
    if (!navigator.onLine) return;
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (!animations) return;
    api.start(animate(0, 1, 600));
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
      const ENDPOINT: string = `${API_BOOKS}?q=${searchQuery}&maxResults=40&key=${KEY}`;
      const options: RequestInit = {
        mode: "cors",
        method: "GET",
        cache: "default",
        headers: { "Content-Type": "application/json" },
      };
      const res: Response = await fetch(ENDPOINT, options);
      const data = await res.json();
      const books: Book[] = (data.items || []).map((item: any) => {
        return {
          id: item?.id,
          data: {
            title: item?.volumeInfo?.title,
            author: item?.volumeInfo?.authors?.join(", "),
            notes: item?.volumeInfo?.description ?? "",
            gender: item.volumeInfo?.categories?.join(", ") || "no-gender",
            state: "Pending",
            isFav: false,
            loaned: "",
            owner: user?.id,
            image: item?.volumeInfo?.imageLinks?.thumbnail,
          },
        };
      });

      const uniqueTitles: Set<string> = new Set<string>();
      const uniqueBooks: Book[] = books.filter((b: Book) => {
        const title: string = deburr(tLC(b.data.title ?? ""));
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
      className="relative max-w-4xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 flex flex-col justify-start items-center gap-y-12 min-h-[350px]"
    >
      <Head>
        <title>Lymbrarie - {t("books-finder")}</title>
        <meta name="description" content={t("and-add}")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBanner condition={showIcon} />

      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col items-center justify-center gap-y-4"
      >
        <InputSearch query={query} setQuery={setQuery} />
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
              <p
                onClick={clearResults}
                className="text-sm w-full max-w-sm text-pretty text-slate-400 text-center hover:text-slate-200 duration-75 cursor-default"
              >
                {t("if-try")}
              </p>
            </div>
          )
        )}

        <TryDifferentTerms
          condition={len(booksResults) == 0 && queryVal != "" && !isLoading}
        />
      </animated.div>
    </animated.section>
  );
}
