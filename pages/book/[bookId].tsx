import DEFAULT_COVER from "@/public/cover.webp";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import Head from "next/head";
import Image from "next/image";
import LoaderCircle from "@/components/LoaderCircle";
import NotesPopUp from "@/components/popups/NotesPopUp";
import OfflinePopUp from "@/components/popups/OfflinePopUp";
import SettingsBtn from "@/components/btns/SettingsBtn";
import ShareBtn from "@/components/btns/ShareBtn";
import toast from "react-hot-toast";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { animated, useSpring } from "@react-spring/web";
import { AuthAction, withUser } from "next-firebase-auth";
import { COLLECTION, EMPTY_BOOK, PAGES } from "@/utils/consts";
import {
  animate,
  deformatTitle,
  isLent,
  tLC,
  translateStateBook,
} from "@/utils/helpers";
import { dismissNoti, notification } from "@/utils/notifications";
import { doc, setDoc } from "firebase/firestore";
import { isEqual, noop, union } from "es-toolkit";
import { popupsAtom } from "@/utils/atoms";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Book, BookData, Component, Handler } from "@/utils/types";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import {
  Trash as DeleteIcon,
  SquarePen as EditIcon,
  BookmarkCheck as FavoriteIcon,
  Library as LibraryIcon,
  Notebook as NotesIcon,
  Bookmark as RemoveFavIcon,
  Tag as StateIcon,
  User as UserIcon,
} from "lucide-react";
import { type NextRouter, useRouter } from "next/router";
import BackBtn from "@/components/btns/BackBtn";

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoaderCircle,
})(BookId);

function BookId(): Component {
  const auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    { openPopUp, closePopUp, closeBookPopUps } = usePopUp(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    title: string = deformatTitle(bookTitle),
    { isLoading, finishLoading } = useLoadContent(),
    Cover: any = animated(Image),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    [notes, setNotes] = useState<string>(""),
    [loadingFav, setLoadingFav] = useState<boolean>(false),
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    [allTitles] = useLocalStorage("all-titles", []),
    myFavs: BookData[] = cacheBooks
      .map((b: Book) => b?.data)
      .filter((b: BookData) => b?.isFav),
    checkFav: boolean = myFavs.some((b: BookData) => isEqual(b?.title, title)),
    notExist: boolean = !allTitles.includes(title),
    notesProps = { updateNotes, notes, setNotes, isLoading, loadingFav },
    [popup] = useRecoilState<any>(popupsAtom),
    handleRouteChange: Handler<void, void> = () => closeBookPopUps(),
    [stylesImg] = useSpring(() => animate(0, 1, 200, 200)),
    [stylesIcons] = useSpring(() => animate(0, 1, 1000)),
    [stylesSection] = useSpring(() => animate(0, 1, 500));

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, []);

  useEffect(() => {
    toast.remove();
    getCacheBook();
    if (!navigator.onLine) return;
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsub();
  }, [bookTitle, auth]);

  useEffect(() => {
    if (notExist) router.push(PAGES.HOME);
  }, [notExist]);

  function getCacheBook(): void {
    const b: Book = cacheBooks.find((b: Book) =>
      isEqual(b?.data?.title, title)
    );
    setBook(b);
    setNotes(b?.data?.notes ?? "");
    setDocumentId(b?.id);
    finishLoading();
  }

  async function updateNotes(): Promise<void> {
    notification("loading", t("saving"));
    try {
      const bookToDB = { ...book?.data, notes };
      await setDoc(doc(COLLECTION, book.id), bookToDB);
      const updatedNotes: Book = { ...book, data: { ...book?.data, notes } },
        oldVersion: Book[] = cacheBooks.filter(
          (b: Book) => b?.id != documentId
        ),
        newVersion: Book[] = union(oldVersion, [updatedNotes]);
      setCacheBooks(newVersion);
      router.reload();
    } catch (err: any) {
      closePopUp("notes");
      router.push(`${PAGES.ERROR}?notes=${notes}`);
      console.error(`catch 'updateNotes' ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  async function toggleFav(): Promise<void> {
    try {
      setLoadingFav(true);
      notification("loading", t(checkFav ? "removing" : "adding"));
      const data: BookData = { ...book?.data, isFav: !checkFav };
      await setDoc(doc(COLLECTION, documentId), data);
      const oldVersion: Book[] = cacheBooks.filter(
        (b: Book) => b?.id != documentId
      );
      const newVersion: Book[] = union(oldVersion, [{ id: documentId, data }]);
      setCacheBooks(newVersion);
      router.reload();
    } catch (err: any) {
      router.push(PAGES.ERROR);
      console.error(`catch 'toggleFav' ${err.message}`);
    }
  }

  return (
    <animated.section
      style={stylesSection}
      className="flex flex-col justify-start items-center w-full relative"
    >
      <Head>
        <title translate="no">{book?.data?.title || "Lymbrarie"}</title>
      </Head>

      {popup.offline && <OfflinePopUp />}
      {popup.edit_book && <EditBookPopUp data={book} documentId={documentId} />}
      {popup.notes && <NotesPopUp {...notesProps} />}
      {popup.delete_book && (
        <DeleteBookPopUp
          documentId={documentId}
          title={book?.data?.title ?? ""}
        />
      )}

      <BackBtn />

      <article
        id="screenshot"
        className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-sm border border-violet-500/20 
          md:rounded-2xl p-8 flex flex-col sm:flex-row gap-8 relative items-center justify-center"
      >
        <div className="flex-shrink-0">
          <div className="md:bg-violet-500/10 p-1.5 rounded-xl">
            <Cover
              priority
              style={stylesImg}
              className="select-none w-[200px] h-[300px] aspect-[2/3] rounded-lg object-cover"
              src={book?.data?.image || DEFAULT_COVER.src}
              width={200}
              height={300}
              alt="cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-y-6">
          <div className="space-y-8">
            <p className="text-2xl sm:text-3xl font-semibold text-slate-200 line-clamp-2">
              {book?.data?.title}
            </p>

            <div className="space-y-3 text-slate-300">
              {book?.data?.author && (
                <div className="flex items-center gap-x-3">
                  <div className="bg-violet-500/20 p-2 rounded-lg">
                    <UserIcon size={18} className="text-violet-300" />
                  </div>
                  <p className="text-base sm:text-lg">{book?.data?.author}</p>
                </div>
              )}

              {book?.data?.gender && book?.data?.gender != "no-gender" && (
                <div className="flex items-center gap-x-3">
                  <div className="bg-violet-500/20 p-2 rounded-lg">
                    <StateIcon size={18} className="text-violet-300" />
                  </div>
                  <p className="text-base sm:text-lg capitalize">
                    {t(tLC(book?.data?.gender))}
                  </p>
                </div>
              )}

              {book?.data?.state && (
                <div className="flex items-center gap-x-3">
                  <div className="bg-violet-500/20 p-2 rounded-lg">
                    <LibraryIcon size={18} className="text-violet-300" />
                  </div>
                  <p className="text-base sm:text-lg">
                    {translateStateBook(book?.data?.state ?? "", t)}
                    {isLent(book?.data?.state ?? "") &&
                      ` ${book?.data?.loaned}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          <animated.div
            id="icons"
            style={stylesIcons}
            className="flex items-center gap-x-3"
          >
            <button
              onClick={() => openPopUp("notes")}
              className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0"
            >
              <NotesIcon className="w-6 h-6" />
            </button>

            <div className="dropdown dropdown-top dropdown-right">
              <SettingsBtn />

              <ul
                tabIndex={0}
                className={twMerge(
                  loadingFav ? "hidden" : "block",
                  "mt-3 z-[1] shadow menu menu-sm dropdown-content rounded-xl border border-violet-500/20 w-[240px] bg-slate-800 mb-1 text-white"
                )}
              >
                <li
                  className="hover:bg-violet-500/15 transition-colors rounded-xl"
                  onClick={() =>
                    navigator.onLine ? toggleFav() : openPopUp("offline")
                  }
                >
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    {checkFav ? (
                      <FavoriteIcon size={18} className="text-violet-300" />
                    ) : (
                      <RemoveFavIcon size={18} className="text-violet-300" />
                    )}
                    <p>{t(checkFav ? "remove-fav" : "add-fav")}</p>
                  </div>
                </li>

                <li
                  className="my-1.5 hover:bg-violet-500/15 transition-colors rounded-xl"
                  onClick={() =>
                    navigator.onLine
                      ? openPopUp("edit_book")
                      : openPopUp("offline")
                  }
                >
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <EditIcon size={18} className="text-violet-300" />
                    <p>{t("edit-book")}</p>
                  </div>
                </li>

                <li
                  className="hover:bg-violet-500/15 transition-colors rounded-xl"
                  onClick={() =>
                    navigator.onLine
                      ? openPopUp("delete_book")
                      : openPopUp("offline")
                  }
                >
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <DeleteIcon size={18} className="text-violet-300" />
                    <p>{t("delete-book")}</p>
                  </div>
                </li>
              </ul>
            </div>

            <ShareBtn title={title} />
          </animated.div>
        </div>
      </article>
    </animated.section>
  );
}
