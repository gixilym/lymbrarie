import BackBtn from "@/components/btns/BackBtn";
import SettingsBtn from "@/components/btns/SettingsBtn";
import NotesBook from "@/components/NotesBook";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import OfflinePopUp from "@/components/popups/OfflinePopUp";
import { COLLECTION, EMPTY_BOOK, EXAMPLES_BOOKS } from "@/utils/consts";
import { deformatTitle, isLoaned, translateStateBook } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import usePopUp from "@/utils/hooks/usePopUp";
import { popupsValue } from "@/utils/store";
import type { Book, Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { doc, setDoc } from "firebase/firestore/lite";
import {
  Trash as DeleteIcon,
  SquarePen as EditIcon,
  Library as LibraryIcon,
  Tag as StateIcon,
  User as UserIcon,
} from "lucide-react";
import { AuthAction, User, useUser, withUser } from "next-firebase-auth";
import Head from "next/head";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import defaultCover from "@/public/cover.webp";
import { Auth, getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";

export default withUser({
  whenAuthed: AuthAction.RENDER,
})(BookId);

function BookId(): Component {
  const { openPopUp } = usePopUp(),
    auth: Auth = getAuth(),
    user: User = useUser(),
    isLogged: boolean = user.id != null,
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    title: string = deformatTitle(bookTitle),
    { isLoading, finishLoading } = useLoadContent(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    [notes, setNotes] = useState<string>(""),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [allTitles] = useLocalStorage("allTitles", []),
    [animations] = useLocalStorage("animations", true),
    notesProps = { updateNotes, notes, setNotes, isLoading },
    [popup] = useRecoilState<any>(popupsValue),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 500 },
    }));

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      () => console.log("auth actualizado"),
      err => console.error(`error actualizando auth: ${err.message}`)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLogged && !allTitles.includes(title)) router.push("/");
  }, [allTitles]);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    if (!bookTitle) return;
    if (isLogged) getCacheBook();
    else getExampleBook();
  }, [isLogged]);

  async function updateNotes(): Promise<void> {
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
      console.error(`Error en updateNotes: ${err.message}`);
      router.push("/error?err=unknown");
    }
  }

  function getExampleBook(): void {
    const book: Book = EXAMPLES_BOOKS.find(
      (b: Book) => b?.data?.title == title
    ) as Book;
    setBook(book);
    setDocumentId(book?.id);
    finishLoading();
  }

  function getCacheBook(): void {
    if (!cacheBooks) return;
    const book: Book = cacheBooks.find((b: Book) => b?.data?.title == title);
    setBook(book);
    setNotes(book?.data?.notes || "");
    setDocumentId(book?.id);
    finishLoading();
  }

  return (
    <animated.section
      style={styles}
      className="flex flex-col justify-center items-center w-full gap-y-6 sm:py-10 h-full"
    >
      <Head>
        <title>{book?.data?.title}</title>
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
          className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-sm"
          src={book?.data?.image || defaultCover}
          width={200}
          height={300}
          alt="cover"
        />

        <div className="flex flex-col justify-between items-start w-[100vw] sm:w-full max-w-[500px] sm:h-full px-10 sm:px-4 pb-2.5">
          <div className="flex flex-col justify-start items-start w-full h-full gap-y-2.5">
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight sm:min-h-20 h-auto overflow-ellipsis overflow-hidden whitespace-wrap w-full">
              {book?.data?.title}
            </h4>
            {book?.data?.author && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
                <UserIcon size={18} />
                <p className="text-md overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {book?.data?.author}
                </p>
              </div>
            )}
            {book?.data?.gender && book?.data?.gender != "no-gender" && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
                <StateIcon size={18} />
                <p className="text-sm capitalize overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {t(book?.data?.gender)}
                </p>
              </div>
            )}

            {book?.data?.state && (
              <div className="flex flex-row justify-start items-center gap-x-2 w-full">
                <LibraryIcon size={18} />
                <p className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {translateStateBook(book?.data?.state ?? "", t)}
                  {isLoaned(book?.data?.state ?? "") &&
                    ` ${book?.data?.loaned}`}
                </p>
              </div>
            )}
          </div>
          <div className="dropdown dropdown-top dropdown-right sm:opacity-80">
            {isLogged && <SettingsBtn />}
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-y-1"
            >
              <li
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

        {isLogged && (
          <NotesBook
            classText="sm:hidden w-full flex min-h-full flex-col justify-start items-start gap-y-4 px-6 bg-transparent"
            {...notesProps}
          />
        )}
      </article>
      {isLogged && (
        <NotesBook
          classText="hidden sm:flex w-[700px] flex-col justify-start items-start gap-y-4 mt-10 bg-transparent"
          {...notesProps}
        />
      )}
    </animated.section>
  );
}
