import useLoadContent from "@/utils/hooks/useLoadContent";
import { BOOK_HANDLER_URL, catchError, EMPTY_BOOK } from "@/utils/store";
import type {
  Book,
  Component,
  FormRef,
  InputEvent,
  Reference,
} from "@/utils/types";
import axios from "axios";
import {
  UserRoundSearch as BorrowedIcon,
  Ampersand as GenderIcon,
  Image as ImageIcon,
  Library as StateIcon,
  Italic as TitleIcon,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import DialogContainer from "../DialogContainer";
import ModalTitle from "./ModalTitle";
import usePopUp from "@/utils/hooks/usePopUp";

function EditBookPopUp(props: { data: any; documentId: string }): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    { data, documentId } = props,
    form: FormRef = useRef<Reference>(null),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    isLoaned: boolean = book?.state == "Borrowed";

  const handleStateChange = (state: string): void =>
    setBook({ ...book, state });

  useEffect(() => loadBookData(), [data]); // eslint-disable-line

  function loadBookData(): void {
    const loadData: Book = {
      title: data?.title,
      author: data?.author,
      state: data?.state,
      image: data?.image,
      gender: data?.gender,
      owner: data?.owner,
      loaned: data?.loaned,
    };
    setBook({ ...loadData });
  }

  function handleChange(event: InputEvent): void {
    const key: string = event.target?.name;
    const value: string = event.target?.value;
    setBook({ ...book, [key]: value });
  }

  async function editBook(): Promise<void> {
    const updatedBook: Book = { ...book };
    const bookData: object = { documentId, updatedBook };
    startLoading();
    axios.patch(BOOK_HANDLER_URL, bookData);
    window.location.href = `/book/${book.title?.replaceAll(" ", "_")}`;
  }

  return (
    <DialogContainer divClass="justify-between">
      <ModalTitle title={t("ModalEdit.edit-book")} />

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <TitleIcon size={18} className="mt-0.5 mr-2" />
        <input
          onChange={handleChange}
          required
          name="title"
          type="text"
          className="grow px-1 placeholder:text-slate-500"
          defaultValue={data.title}
          placeholder={t("ModalNewBook.title")}
        />
      </label>

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <UserIcon size={18} className="mt-0.5 mr-2" />
        <input
          onChange={handleChange}
          name="author"
          type="text"
          className="grow px-1 placeholder:text-slate-500"
          defaultValue={data.author}
          placeholder={t("ModalNewBook.author")}
        />
      </label>

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <GenderIcon size={18} className="mt-0.5 mr-2" />
        <input
          onChange={handleChange}
          name="gender"
          type="text"
          className="grow px-1 placeholder:text-slate-500"
          defaultValue={data.gender}
          placeholder={t("ModalNewBook.gender")}
        />
      </label>

      <div className="join w-full space-x-2">
        <label
          className={twMerge(
            isLoaned ? "w-2/4" : "w-full",
            "input input-bordered flex items-center sm:text-xl text-lg h-14 sm:w-full"
          )}
        >
          <StateIcon size={18} className="mt-0.5" />
          <select
            onChange={e => handleStateChange(e.target.value)}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full text-gray-400 focus:outline-0 h-14"
            defaultValue="Default"
          >
            <option value="Default" disabled>
              {t("ModalNewBook.state.default")}
            </option>
            <option value="Reading">{t("ModalNewBook.state.reading")}</option>
            <option value="Read">{t("ModalNewBook.state.read")}</option>
            <option value="Pending">{t("ModalNewBook.state.pending")}</option>
            <option value="Borrowed">{t("ModalNewBook.state.borrowed")}</option>
          </select>
        </label>
        {isLoaned && (
          <label className="input input-bordered flex items-center sm:text-xl text-lg h-14 w-2/4 sm:w-full">
            <BorrowedIcon size={18} className="mt-0.5 mr-2" />
            <input
              onChange={handleChange}
              name="loaned"
              type="text"
              defaultValue={data.loaned}
              className="grow px-1 placeholder:text-slate-500"
              placeholder={t("ModalNewBook.loanedto")}
            />
          </label>
        )}
      </div>

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <ImageIcon size={18} className="mt-0.5 mr-2" />
        <input
          onChange={handleChange}
          name="image"
          type="text"
          className="grow px-1 placeholder:text-slate-500 text-md"
          defaultValue={data.image}
          placeholder={
            t("ModalNewBook.link") +
            "https://res.cloudinary.com/dgs55s8qh/image/upload/v1711510484/dvjjtuqhfjqtwh3vcf3p.webp"
          }
        />
      </label>

      <div className="modal-action pt-1">
        <form
          onSubmit={editBook}
          ref={form}
          method="dialog"
          className="space-x-2 font-public"
        >
          <button
            type="button"
            onClick={() => closePopUp("edit_book")}
            className="btn text-lg w-24 px-2 bg-slate-800 hover:bg-slate-700 text-white"
          >
            {t("ModalSettings.close")}
          </button>

          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-red-500 text-black hover:bg-red-400 duration-100 text-lg w-24 px-2"
            >
              {t("ModalNewBook.charging")}
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-blue-500 text-black hover:bg-blue-400 duration-100 text-lg w-24 px-2"
            >
              {t("ModalEdit.edit-confirm")}
            </button>
          )}
        </form>
      </div>
    </DialogContainer>
  );
}

export default EditBookPopUp;
