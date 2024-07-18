import BackBtn from "@/components/btns/BackBtn";
import SettingsBtn from "@/components/btns/SettingsBtn";
import LoadComponent from "@/components/LoadComponent";
import NotesBook from "@/components/NotesBook";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import OfflinePopUp from "@/components/popups/OfflinePopUp";
import defaultCover from "@/public/cover.webp";
import { COLLECTION, EMPTY_BOOK, PRODUCTION } from "@/utils/consts";
import {
  deformatTitle,
  dismissNoti,
  isLoaned,
  notification,
  translateStateBook,
} from "@/utils/helpers";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { popupsVal } from "@/utils/store";
import type { Book, BookData, Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { isEqual, noop, union } from "es-toolkit";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import {
  Trash as DeleteIcon,
  SquarePen as EditIcon,
  BookmarkCheck as FavoriteIcon,
  Library as LibraryIcon,
  Bookmark as RemoveFavIcon,
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

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoadComponent,
})(BookId);

function BookId(): Component {
  const { openPopUp } = usePopUp(),
    auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    title: string = deformatTitle(bookTitle),
    { isLoading, finishLoading } = useLoadContent(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    [notes, setNotes] = useState<string>(""),
    [loadingFav, setLoadingFav] = useState<boolean>(false),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [animations] = useLocalStorage("animations", true),
    [allTitles] = useLocalStorage("allTitles", []),
    myFavs: BookData[] = cacheBooks
      .map((b: Book) => b?.data)
      .filter((b: BookData) => b?.isFav),
    checkFav: boolean = myFavs.some((b: BookData) => isEqual(b?.title, title)),
    notExist: boolean = !allTitles.includes(title),
    notesProps = { updateNotes, notes, setNotes, isLoading, loadingFav },
    [popup] = useRecoilState<any>(popupsVal),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 500 },
    }));

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, () => noop());
    getCacheBook();
    toast.remove();
    return () => unsubscribe();
  }, [bookTitle, auth]);

  useEffect(() => {
    if (notExist) router.push("/");
  }, [notExist]);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

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
    notification("loading", t("editing"));
    try {
      const bookToDB = { ...book?.data, notes };
      await setDoc(doc(COLLECTION, book.id), bookToDB);
      const updatedNotes: Book = { ...book, data: { ...book?.data, notes } },
        oldVersion: Book[] = cacheBooks.filter(
          (b: Book) => b?.id != documentId
        ),
        newVersion: Book[] = [...oldVersion, updatedNotes];
      setCacheBooks(newVersion);
      router.reload();
    } catch (err: any) {
      if (PRODUCTION) router.push("/error");
      else console.error(`Error en updateNotes: ${err.message}`);
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
      if (PRODUCTION) router.push("/error");
      else console.error(`Error en toggleFav: ${err.message}`);
    }
  }

  return (
    <animated.section
      style={styles}
      className="flex flex-col justify-center items-center w-full gap-y-6 sm:py-10 h-full"
    >
      <Head>
        <title>{book?.data?.title || "Lymbrarie"}</title>
      </Head>

      {popup.offline && <OfflinePopUp />}
      {popup.edit_book && <EditBookPopUp data={book} documentId={documentId} />}
      {popup.delete_book && (
        <DeleteBookPopUp
          documentId={documentId}
          title={book?.data?.title ?? ""}
        />
      )}

      <BackBtn />

      <article className="w-full sm:w-[700px] h-[315px] flex flex-col sm:flex-row gap-y-12 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative mt-20 xl:mt-0 sm:mt-12">
        <Image
          priority
          className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-md"
          src={book?.data?.image || defaultCover}
          width={200}
          height={300}
          alt="cover"
        />

        <div className="flex flex-col justify-between items-start w-[100vw] sm:w-full max-w-[500px] sm:h-full px-10 sm:px-4 pb-2.5">
          <div className="flex flex-col justify-start items-start w-full h-full gap-y-2 sm:gap-y-3">
            <h4 className="text-xl sm:text-3xl font-bold tracking-wide sm:min-h-20 h-auto overflow-ellipsis overflow-hidden whitespace-wrap w-full">
              {book?.data?.title}
            </h4>

            {book?.data?.author && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
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
          <div className="dropdown dropdown-bottom dropdown-left sm:dropdown-right opacity-100 flex sm:block items-end justify-center absolute sm:relative right-10 sm:right-0 top-60 sm:top-0">
            <SettingsBtn />
            <ul
              tabIndex={0}
              className={twMerge(
                loadingFav ? "hidden" : "block",
                "mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box sm:w-52 w-56"
              )}
            >
              <li
                onClick={() =>
                  navigator.onLine ? toggleFav() : openPopUp("offline")
                }
              >
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
                }
              >
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
                }
              >
                <div className="flex flex-row items-center justify-start gap-x-3">
                  <DeleteIcon size={18} />
                  <p>{t("delete-book")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <NotesBook
          classText="sm:hidden w-full flex min-h-full flex-col justify-start items-start gap-y-4 px-6 bg-transparent"
          {...notesProps}
        />
      </article>
      <NotesBook
        classText="hidden sm:flex w-[700px] flex-col justify-start items-start gap-y-4 mt-10 bg-transparent"
        {...notesProps}
      />
    </animated.section>
  );
}
