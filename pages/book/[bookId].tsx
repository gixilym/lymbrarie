"use client";
import LoadComponent from "@/components/LoadComponent";
import NotesBook from "@/components/NotesBook";
import DeleteBookPopUp from "@/components/popups/DeleteBookPopUp";
import EditBookPopUp from "@/components/popups/EditBookPopUp";
import MatonesPopUp from "@/components/popups/MatonesPopUp";
import useLoadContent from "@/utils/hooks/useLoadContent";
import usePopUp from "@/utils/hooks/usePopUp";
import useSessionExists from "@/utils/hooks/useSessionExists";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { getBookData, translateStateBook } from "@/utils/services/getBookData";
import {
  BOOK_HANDLER_URL,
  DEFAULT_COVER,
  EMPTY_BOOK,
  modalsValue,
} from "@/utils/store";
import { SettingsSVG } from "@/utils/svgs";
import type { Component, DocumentVoid, NextRouter } from "@/utils/types";
import axios from "axios";
import {
  Ampersand as AmpersandIcon,
  CircleChevronLeft as BackIcon,
  Library as LibraryIcon,
  NotepadText as NotesIcon,
  Pencil as PencilIcon,
  MessageSquareWarning as ThugsIcon,
  Trash as TrashIcon,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function BookId(): Component {
  const router: NextRouter = useRouter(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [data, setData] = useState<DocumentVoid>(EMPTY_BOOK),
    [documentId, setDocumentId] = useState<string>(""),
    img: string = data?.image || DEFAULT_COVER,
    [showNotes, setShowNotes] = useState<boolean>(false),
    { userLoggedIn } = useSessionExists(),
    { userEmail } = useUserEmail(),
    { openPopUp } = usePopUp(),
    [notes, setNotes] = useState<string>(""),
    [t] = useTranslation("global"),
    formatTitle: string = bookTitle.replaceAll("_", " "),
    userExists: boolean = userEmail != null,
    notesProps = { updateNotes, notes, showNotes, setNotes },
    [modal] = useRecoilState(modalsValue);

  useEffect(() => {
    if (!bookTitle) return;
    else {
      startLoading();
      userLoggedIn ? loadBookData() : loadExampleBookData();
    }
  }, [userEmail]); // eslint-disable-line

  function updateNotes(): void {
    const bookData = { documentId, data, notes };
    setShowNotes(false);
    axios.put(BOOK_HANDLER_URL, bookData);
  }

  async function loadBookData(): Promise<void> {
    if (userExists) {
      const book: DocumentVoid = await getBookData(formatTitle, userEmail);
      setData(book?.data);
      setDocumentId(book?.id);
      setNotes(book?.data?.notes);
      finishLoading();
    }
  }

  async function loadExampleBookData(): Promise<void> {
    const book: DocumentVoid = await getBookData(formatTitle, "examples");
    setData(book?.data);
    setDocumentId(book?.id);
    finishLoading();
  }

  return (
    <section className="flex flex-col justify-center items-center w-full gap-y-6 py-20">
      {modal.edit_book && <EditBookPopUp data={data} documentId={documentId} />}
      {modal.matones && <MatonesPopUp />}
      {modal.delete_book && <DeleteBookPopUp documentId={documentId} />}

      <article className="w-full sm:w-[700px] h-[315px] flex flex-col sm:flex-row gap-y-12 sm:gap-y-0 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative rounded-lg">
        {isLoading ? (
          <LoadComponent />
        ) : (
          <>
            <Link
              href="/"
              className="absolute w-12 right-0 rounded-full z-10 mr-2 sm:mr-0 btn btn-ghost"
            >
              <BackIcon size={40} color="white" className="scale-[3]" />
            </Link>
            <Image
              className="aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-sm"
              src={img}
              width={100}
              height={100}
              alt="cover"
            />
            <div className="flex flex-col justify-start items-start w-[100vw] sm:w-full sm:h-full px-4 gap-y-2">
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight sm:min-h-20 h-auto text-ellipsis">
                {data?.title}
              </h4>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <UserIcon size={18} />
                <p className="text-md">
                  {data?.author ? data.author : t("Unknow")}
                </p>
              </div>

              {data?.gender && (
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <AmpersandIcon size={18} />
                  <p className="text-sm">{data.gender}</p>
                </div>
              )}

              <div className="flex flex-row justify-start items-center gap-x-2">
                <LibraryIcon size={18} />
                <p className="text-sm">
                  {translateStateBook(data?.state, t)}
                  {data?.loaned ? ` ${data.loaned}` : ""}
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
                      <p>{t("ModalBook.edit")}</p>
                    </div>
                  </li>
                  <li onClick={() => setShowNotes(!showNotes)}>
                    <div className="flex flex-row items-center justify-start gap-x-3">
                      <NotesIcon size={18} />
                      <p>
                        {showNotes
                          ? t("ModalBook.hidden-notes")
                          : t("ModalBook.modify-notes")}
                      </p>
                    </div>
                  </li>
                  {data?.state == "Borrowed" && (
                    <li onClick={() => openPopUp("matones")}>
                      <div className="flex flex-row justify-start items-center gap-x-2">
                        <ThugsIcon size={18} />
                        <p>{t("ModalBook.send-thugs")}</p>
                      </div>
                    </li>
                  )}
                  <li onClick={() => openPopUp("delete_book")}>
                    <div className="flex flex-row items-center justify-start gap-x-3">
                      <TrashIcon size={18} />
                      <p>{t("ModalBook.delete")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <NotesBook
              classText="sm:hidden px-4 w-[100vw] flex flex-col justify-start items-start rounded-md gap-y-4"
              {...notesProps}
            />
          </>
        )}
      </article>
      <NotesBook
        classText="hidden sm:flex px-0 w-[700px] flex-col justify-start items-start rounded-md p-1 gap-y-10"
        {...notesProps}
      />
    </section>
  );
}

export default BookId;
