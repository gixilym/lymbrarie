import Breadcrumbs from "@/components/Breadcrumbs";
import BackBtn from "@/components/btns/BackBtn";
import SettingsBtn from "@/components/btns/SettingsBtn";
import LoadComponent from "@/components/LoadComponent";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import NotesPopUp from "@/components/popups/NotesPopUp";
import OfflinePopUp from "@/components/popups/OfflinePopUp";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import defaultCover from "@/public/cover.webp";
import { popupsAtom } from "@/utils/atoms";
import { COLLECTION, EMPTY_BOOK, PRODUCTION } from "@/utils/consts";
import { deformatTitle, isLoaned, translateStateBook } from "@/utils/helpers";
import { dismissNotification, notification } from "@/utils/notifications";
import type { Book, BookData, Component, Handler } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { isEqual, noop, union } from "es-toolkit";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Trash as DeleteIcon,
  SquarePen as EditIcon,
  BookmarkCheck as FavoriteIcon,
  Library as LibraryIcon,
  Notebook as NotesIcon,
  Bookmark as RemoveFavIcon,
  Share2,
  Tag as StateIcon,
  User as UserIcon,
} from "lucide-react";
import { AuthAction, withUser } from "next-firebase-auth";
import Head from "next/head";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas-pro";

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoadComponent,
})(BookId);

function BookId(): Component {
  const { openPopUp, closePopUp, closeBookPopUps } = usePopUp(),
    auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    title: string = deformatTitle(bookTitle),
    [animations] = useLocalStorage("animations", true),
    { isLoading, finishLoading } = useLoadContent(),
    Cover = animated(Image),
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
    [stylesImg] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 700 },
    })),
    [stylesIcons] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    })),
    [stylesSection] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 500 },
    }));

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, []);

  useEffect(() => {
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    getCacheBook();
    toast.remove();
    return () => unsub();
  }, [bookTitle, auth]);

  useEffect(() => {
    if (notExist) router.push("/");
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
      if (PRODUCTION) router.push(`/error?notes=${notes}`);
      else console.error(`Error en updateNotes: ${err.message}`);
    } finally {
      dismissNotification();
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
      if (PRODUCTION) router.push("/error");
      else console.error(`Error en toggleFav: ${err.message}`);
    }
  }

  // function handleShare() {
  //   const container = document.getElementById("screenshot");
  //   if (container) {
  //     html2canvas(container, { backgroundColor: "rgb(2,6,23)" }).then(
  //       canvas => {
  //         const image = canvas.toDataURL("image/png");
  //         const link = document.createElement("a");
  //         link.href = image;
  //         link.download = bookTitle;
  //         link.click();
  //       }
  //     );
  //   }
  // }

  function handleShare() {
    const info = {
      title,
      text: "Lymbrarie - donde cada libro encuentra su lugar",
      url: "https://lymbrarie.com",
    };
    if (navigator.share) {
      navigator
        .share(info)
        .then(() => console.log("Compartido"))
        .catch(err => console.error(err));
    } else alert("navegador no compatible");
  }

  return (
    <animated.section
      style={stylesSection}
      className="flex flex-col justify-center items-center w-full gap-y-6 sm:pb-10 sm:pt-20 h-full sm:pl-20">
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

      <BackBtn hidden />
      <Breadcrumbs title={book?.data?.title ?? ""} />
      <article
        id="screenshot"
        className="w-full sm:w-[700px] h-[300px] flex flex-col sm:flex-row gap-y-12 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative mt-20 xl:mt-0 sm:mt-12">
        <Cover
          priority
          style={stylesImg}
          className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-md"
          src={book?.data?.image || defaultCover}
          width={200}
          height={300}
          alt="cover"
        />

        <div className="flex flex-col justify-between items-start w-[100vw] sm:w-full max-w-[500px] sm:h-full px-10 sm:px-4 pb-2.5">
          <div className="flex flex-col justify-start items-start w-full h-full gap-y-2">
            <h4 className="text-xl sm:text-[28px] font-bold tracking-wide sm:min-h-20 h-auto overflow-ellipsis overflow-hidden whitespace-wrap w-full">
              {book?.data?.title}
            </h4>

            {book?.data?.author && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full mt-4">
                <UserIcon size={18} />
                <p className="text-sm sm:text-[16px] overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {book?.data?.author}
                </p>
              </div>
            )}

            {book?.data?.gender && book?.data?.gender != "no-gender" && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
                <StateIcon size={18} />
                <p className="text-sm sm:text-[16px] capitalize overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {t(book?.data?.gender)}
                </p>
              </div>
            )}

            {book?.data?.state && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
                <LibraryIcon size={18} />
                <p className="text-sm sm:text-[16px] overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {translateStateBook(book?.data?.state ?? "", t)}
                  {isLoaned(book?.data?.state ?? "") &&
                    ` ${book?.data?.loaned}`}
                </p>
              </div>
            )}
          </div>
          <animated.div
            style={stylesIcons}
            className="flex items-center justify-center gap-x-2">
            <button
              onClick={() => openPopUp("notes")}
              className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mt-4 sm:mt-0 mb-1">
              <NotesIcon className="w-6 h-6 sm:w-7 sm:h-8" />
            </button>
            <div className="dropdown dropdown-top dropdown-right opacity-100 flex sm:block items-end justify-center">
              <SettingsBtn />
              <ul
                tabIndex={0}
                className={twMerge(
                  loadingFav ? "hidden" : "block",
                  "mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-[240px]"
                )}>
                <li
                  onClick={() =>
                    navigator.onLine ? toggleFav() : openPopUp("offline")
                  }>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    {checkFav ? (
                      <FavoriteIcon size={18} />
                    ) : (
                      <RemoveFavIcon size={18} />
                    )}
                    <p>{t(checkFav ? "remove-fav" : "add-fav")}</p>
                  </div>
                </li>

                <li
                  className="py-1.5"
                  onClick={() =>
                    navigator.onLine
                      ? openPopUp("edit_book")
                      : openPopUp("offline")
                  }>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <EditIcon size={18} />
                    <p>{t("edit-book")}</p>
                  </div>
                </li>

                <li
                  onClick={() =>
                    navigator.onLine
                      ? openPopUp("delete_book")
                      : openPopUp("offline")
                  }>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <DeleteIcon size={18} />
                    <p>{t("delete-book")}</p>
                  </div>
                </li>
              </ul>
            </div>
            <button
              onClick={handleShare}
              className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0 ">
              <Share2 className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
            </button>
          </animated.div>
        </div>
      </article>
    </animated.section>
  );
}
