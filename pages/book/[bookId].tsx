import BackBtn from "@/components/btns/BackBtn";
import SettingsBtn from "@/components/btns/SettingsBtn";
import NotesBook from "@/components/NotesBook";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import ThugsPopUp from "@/components/popups/ThugsPopUp";
import { getBookData, isLoaned, translateStateBook } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import usePopUp from "@/utils/hooks/usePopUp";
import useSessionExists from "@/utils/hooks/useSessionExists";
import useUserEmail from "@/utils/hooks/useUserEmail";
import {
  BOOK_HANDLER_URL,
  DEFAULT_COVER,
  EMPTY_BOOK,
  EXAMPLES_BOOKS,
  popupsValue,
} from "@/utils/store";
import type { Book, Component, Document, Timer } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import {
  Library as LibraryIcon,
  Pencil as PencilIcon,
  Tag as StateIcon,
  MessageSquareWarning as ThugsIcon,
  Trash as TrashIcon,
  User as UserIcon,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function BookId(): Component {
  const router: NextRouter = useRouter(),
    { openPopUp } = usePopUp(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    title: string = bookTitle.replaceAll("_", " ").replaceAll("@", "?"),
    { isLoading, finishLoading } = useLoadContent(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    { userLoggedIn } = useSessionExists(),
    { userEmail } = useUserEmail(),
    [notes, setNotes] = useState<string>(""),
    [t] = useTranslation("global"),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", []),
    [animations] = useLocalStorage("animations", true),
    userExists: boolean = userEmail != null,
    notesProps = { updateNotes, notes, setNotes, isLoading },
    [showImage, setShowImage] = useState<boolean>(false),
    [popup] = useRecoilState(popupsValue),
    [styles, animate] = useSpring(() => ({
      opacity: 0,
      config: { duration: 500 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    const timer: Timer = setTimeout(() => setShowImage(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bookTitle) return;
    else userLoggedIn ? getCacheBook() : loadExampleBookData();
  }, [userEmail]);

  function updateNotes(): void {
    const updatedNotes = { ...book, data: { ...book.data, notes } };
    axios.put(BOOK_HANDLER_URL, { updatedNotes });
    setCacheBooks(null);
  }

  async function loadExampleBookData(): Promise<void> {
    const book: Document = await getBookData(title, EXAMPLES_BOOKS);
    setBook(book);
    setDocumentId(book?.data.id);
    finishLoading();
  }

  function getCacheBook(): void {
    if (!cacheBooks) return;
    const book: Book = cacheBooks.find((b: Book) => b.data?.title == title);
    setBook(book);
    setNotes(book.data.notes || "");
    setDocumentId(book.id);
    finishLoading();
  }

  return (
    <animated.section
      style={styles}
      className="flex flex-col justify-center items-center w-full gap-y-6 sm:py-10 h-full"
    >
      <Head>
        <title>{book.data.title}</title>
      </Head>

      {popup.thugs && <ThugsPopUp />}
      {popup.edit_book && <EditBookPopUp data={book} documentId={documentId} />}
      {popup.delete_book && (
        <DeleteBookPopUp
          documentId={documentId}
          title={book?.data.title ?? ""}
        />
      )}

      <BackBtn />
      <article className="w-full sm:w-[700px] h-[315px] flex flex-col sm:flex-row gap-y-12 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative mt-20 xl:mt-0 sm:mt-12">
        {showImage ? (
          <Image
            priority
            className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-sm"
            src={book.data.image || DEFAULT_COVER}
            width={200}
            height={200}
            alt="cover"
          />
        ) : (
          <div className="aspect-[200/300] w-[200px] h-[300px] border-2 border-gray-500/70 rounded-sm" />
        )}

        <div className="flex flex-col justify-start items-start w-[100vw] sm:w-full max-w-[500px] sm:h-full px-10 sm:px-4 gap-y-2">
          <h4 className="text-2xl sm:text-3xl font-bold tracking-tight sm:min-h-20 h-auto overflow-ellipsis overflow-hidden whitespace-wrap w-full">
            {book.data.title}
          </h4>
          {book.data?.author && (
            <div className="flex flex-row justify-start items-center gap-x-2 w-full">
              <UserIcon size={18} />
              <p className="text-md overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                {book.data.author}
              </p>
            </div>
          )}
          {book.data.gender && book.data.gender != "no-gender" && (
            <div className="flex flex-row justify-start items-center gap-x-2 w-full">
              <StateIcon size={18} />
              <p className="text-sm capitalize overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                {t(book.data.gender)}
              </p>
            </div>
          )}

          <div className="flex flex-row justify-start items-center gap-x-2 w-full">
            <LibraryIcon size={18} />
            <p className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
              {translateStateBook(book.data.state ?? "", t)}
              {isLoaned(book.data.state ?? "") && ` ${book.data.loaned}`}
            </p>
          </div>

          <div className="dropdown dropdown-top dropdown-left sm:opacity-80 absolute bottom-0 right-2 sm:right-0">
            {userLoggedIn && <SettingsBtn />}
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-y-1"
            >
              <li onClick={() => openPopUp("edit_book")}>
                <div className="flex flex-row items-center justify-start gap-x-3">
                  <PencilIcon size={18} />
                  <p>{t("edit-book")}</p>
                </div>
              </li>

              {isLoaned(book.data.state ?? "") && (
                <li onClick={() => openPopUp("thugs")}>
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <ThugsIcon size={18} />
                    <p>{t("send-thugs")}</p>
                  </div>
                </li>
              )}
              <li onClick={() => openPopUp("delete_book")}>
                <div className="flex flex-row items-center justify-start gap-x-3">
                  <TrashIcon size={18} />
                  <p>{t("delete-book")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {userExists && (
          <NotesBook
            classText="sm:hidden w-full flex min-h-full flex-col justify-start items-start gap-y-4 px-6 bg-transparent"
            {...notesProps}
          />
        )}
      </article>
      {userExists && (
        <NotesBook
          classText="hidden sm:flex w-[700px] flex-col justify-start items-start gap-y-10 mt-10 bg-transparent"
          {...notesProps}
        />
      )}
    </animated.section>
  );
}

export default BookId;
