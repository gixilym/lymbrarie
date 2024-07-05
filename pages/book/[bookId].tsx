//"use client";
import BackBtn from "@/components/BackBtn";
import LoadComponent from "@/components/LoadComponent";
import NotesBook from "@/components/NotesBook";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import ThugsPopUp from "@/components/popups/ThugsPopUp";
import { getBookData, isLoaned, translateStateBook } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
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
import { SettingsSVG } from "@/utils/svgs";
import type { Component, Document } from "@/utils/types";
import axios from "axios";
import {
  Ampersand as AmpersandIcon,
  Library as LibraryIcon,
  Pencil as PencilIcon,
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
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [data, setData] = useState<Document>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    { userLoggedIn } = useSessionExists(),
    { userEmail } = useUserEmail(),
    [notes, setNotes] = useState<string>(""),
    [t] = useTranslation("global"),
    formatTitle: string = bookTitle.replaceAll("_", " ").replaceAll("@", "?"),
    userExists: boolean = userEmail != null,
    notesProps = { updateNotes, notes, setNotes },
    [popup] = useRecoilState(popupsValue);

  useEffect(() => {
    if (!bookTitle) return;
    else {
      startLoading();
      userLoggedIn ? loadBookData() : loadExampleBookData();
    }
  }, [userEmail]); // eslint-disable-line

  function updateNotes(): void {
    const bookData = { documentId, data, notes };
    axios.put(BOOK_HANDLER_URL, bookData);
  }

  async function loadBookData(): Promise<void> {
    if (userExists) {
      const book: Document = await getBookData(formatTitle, userEmail);
      setData(book?.data);
      setDocumentId(book?.id);
      setNotes(book?.data?.notes);
      finishLoading();
    }
  }

  async function loadExampleBookData(): Promise<void> {
    const book: Document = await getBookData(formatTitle, EXAMPLES_BOOKS);
    setData(book?.data);
    setDocumentId(book?.id);
    finishLoading();
  }

  return (
    <section className=" flex flex-col justify-center items-center w-full gap-y-6 sm:py-10 h-full ">
      <Head>
        <title>{data?.title || "Lymbrarie"}</title>
      </Head>

      {popup.edit_book && <EditBookPopUp data={data} documentId={documentId} />}
      {popup.thugs && <ThugsPopUp />}
      {popup.delete_book && <DeleteBookPopUp documentId={documentId} />}

      {isLoading ? (
        <LoadComponent />
      ) : (
        <>
          <BackBtn />
          <article className="w-full sm:w-[700px] h-[315px] flex flex-col sm:flex-row gap-y-12 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative mt-20 xl:mt-0 sm:mt-12">
            <Image
              priority
              className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-sm"
              src={data?.image || DEFAULT_COVER}
              width={100}
              height={100}
              alt="cover"
            />
            <div className="flex flex-col justify-start items-start w-[100vw] sm:w-full sm:h-full px-10 sm:px-4 gap-y-2">
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight sm:min-h-20 h-auto text-ellipsis">
                {data?.title}
              </h4>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <UserIcon size={18} />
                <p className="text-md">{data?.author || t("unknow")}</p>
              </div>

              {data?.gender && data.gender != "no-gender" && (
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <AmpersandIcon size={18} />
                  <p className="text-sm capitalize">{t(data.gender)}</p>
                </div>
              )}

              <div className="flex flex-row justify-start items-center gap-x-2">
                <LibraryIcon size={18} />
                <p className="text-sm">
                  {translateStateBook(data?.state, t)}
                  {isLoaned(data?.state ?? "") && ` ${data?.loaned}`}
                </p>
              </div>

              <div className="dropdown dropdown-top dropdown-left sm:opacity-80 absolute bottom-0 right-2 sm:right-0">
                {userLoggedIn && <SettingsSVG />}
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

                  {isLoaned(data?.state ?? "") && (
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
                classText="sm:hidden w-full flex min-h-full flex-col justify-start items-start gap-y-4 px-6 bg-slate-950 "
                {...notesProps}
              />
            )}
          </article>
          {userExists && (
            <NotesBook
              classText="hidden sm:flex w-[700px] flex-col justify-start items-start gap-y-10 mt-10 bg-slate-950"
              {...notesProps}
            />
          )}
        </>
      )}
    </section>
  );
}

export default BookId;
