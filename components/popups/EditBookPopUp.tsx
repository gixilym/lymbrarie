import useLoadContent from "@/utils/hooks/useLoadContent";
import usePopUp from "@/utils/hooks/usePopUp";
import { BOOK_HANDLER_URL, EMPTY_BOOK } from "@/utils/store";
import type {
  Book,
  Component,
  FormRef,
  InputEvent,
  SelectEvent,
} from "@/utils/types";
import axios from "axios";
import {
  UserRoundSearch as BorrowedIcon,
  Type as CustomIcon,
  Ampersand as GenderIcon,
  Image as ImageIcon,
  Library as StateIcon,
  Italic as TitleIcon,
  User as UserIcon,
} from "lucide-react";
import { type Reference, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";
import Link from "next/link";

function EditBookPopUp(props: Props): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    { data, documentId } = props,
    form: FormRef = useRef<Reference>(null),
    { isLoading, startLoading } = useLoadContent(),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    [isCustomGender, setIsCustomGender] = useState<boolean>(false),
    isLoaned: boolean = book?.state == "Borrowed",
    handleState = (state: string): void => setBook({ ...book, state });

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
      notes: data?.notes,
    };
    setBook({ ...loadData });
  }

  function handleChange(e: InputEvent): void {
    const key: string = e.target?.name;
    const value: string = e.target?.value;
    setBook({ ...book, [key]: value });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value;
    setBook({ ...book, gender });
    setIsCustomGender(gender == "custom");
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
      <PopUpTitle title={t("edit-book")} />

      <label
        htmlFor="title-input"
        className="input input-bordered flex items-center sm:text-xl text-lg h-14"
      >
        <TitleIcon size={18} className="mt-0.5 mr-2" />
        <input
          id="title-input"
          onChange={handleChange}
          required
          name="title"
          type="text"
          className="grow px-1 placeholder:text-slate-500"
          defaultValue={data.title}
          placeholder={t("placeholder-title")}
        />
      </label>

      <label
        htmlFor="author-input"
        className="input input-bordered flex items-center sm:text-xl text-lg h-14"
      >
        <UserIcon size={18} className="mt-0.5 mr-2" />
        <input
          id="author-input"
          onChange={handleChange}
          name="author"
          type="text"
          className="grow px-1 placeholder:text-slate-500"
          defaultValue={data.author}
          placeholder={t("placeholder-author")}
        />
      </label>

      <div className="join w-full space-x-2">
        <label
          htmlFor="gender-select"
          className="w-full input input-bordered flex items-center sm:text-xl text-lg h-14 sm:w-full"
        >
          <GenderIcon size={18} className="mt-0.5 mr-2" />
          <select
            id="gender-select"
            onChange={handleGender}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full text-gray-400 focus:outline-0 h-14"
            defaultValue={data.gender}
          >
            <option value="default" disabled>
              {t("placeholder-gender")}
            </option>
            <option value="custom">{t("custom-gender")}</option>
            <option value="fiction">{t("fiction")}</option>
            <option value="non-fiction">{t("non-fiction")}</option>
            <option value="mystery">{t("mystery")}</option>
            <option value="fantasy">{t("fantasy")}</option>
            <option value="philosophy">{t("philosophy")}</option>
            <option value="economy">{t("economy")}</option>
            <option value="romance">{t("romance")}</option>
            <option value="horror">{t("horror")}</option>
            <option value="thriller">{t("thriller")}</option>
            <option value="history">{t("history")}</option>
            <option value="biography">{t("biography")}</option>
            <option value="self-help">{t("self-help")}</option>
            <option value="poetry">{t("poetry")}</option>
            <option value="drama">{t("drama")}</option>
            <option value="adventure">{t("adventure")}</option>
            <option value="young-adult">{t("young-adult")}</option>
            <option value="children's">{t("children's")}</option>
          </select>
        </label>
        {isCustomGender && (
          <label
            htmlFor="gender-input"
            className="input input-bordered flex items-center sm:text-xl text-lg h-14 w-2/4 sm:w-full"
          >
            <CustomIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="gender-input"
              onChange={handleChange}
              name="gender"
              type="text"
              defaultValue={data.gender}
              className="grow px-1 placeholder:text-slate-500"
              placeholder={t("custom-gender")}
            />
          </label>
        )}
      </div>

      <div className="join w-full space-x-2">
        <label
          htmlFor="state-select"
          className={twMerge(
            isLoaned ? "w-2/4" : "w-full",
            "input input-bordered flex items-center sm:text-xl text-lg h-14 sm:w-full"
          )}
        >
          <StateIcon size={18} className="mt-0.5" />
          <select
            id="state-select"
            onChange={e => handleState(e.target.value)}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full text-gray-400 focus:outline-0 h-14"
            defaultValue="default"
          >
            <option value="default" disabled>
              {t("new-book-default")}
            </option>
            <option value="Reading">{t("new-book-reading")}</option>
            <option value="Read">{t("new-book-read")}</option>
            <option value="Pending">{t("new-book-pending")}</option>
            <option value="Borrowed">{t("new-book-borrowed")}</option>
          </select>
        </label>
        {isLoaned && (
          <label
            htmlFor="loaned-input"
            className="input input-bordered flex items-center sm:text-xl text-lg h-14 w-2/4 sm:w-full"
          >
            <BorrowedIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="loaned-input"
              onChange={handleChange}
              name="loaned"
              type="text"
              defaultValue={data.loaned}
              className="grow px-1 placeholder:text-slate-500"
              placeholder={t("loanedto")}
            />
          </label>
        )}
      </div>

      <div>
        <label
          htmlFor="image-input"
          className="input input-bordered flex items-center sm:text-xl text-lg h-14"
        >
          <ImageIcon size={18} className="mt-0.5 mr-2" />
          <input
            id="image-input"
            onChange={handleChange}
            name="image"
            type="text"
            className="grow px-1 placeholder:text-slate-500 text-md"
            defaultValue={data.image}
            placeholder={
              t("placeholder-link") +
              "https://res.cloudinary.com/dgs55s8qh/image/upload/v1711510484/dvjjtuqhfjqtwh3vcf3p.webp"
            }
          />
        </label>
        <Link
          href="https://imagen-a-link.netlify.app"
          target="_blank"
          className="link text-slate-400 hover:text-slate-300 duration-75 text-md sm:text-lg"
        >
          {t("generate-link")}
        </Link>
      </div>

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
            {t("close")}
          </button>

          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-red-500 text-black hover:bg-red-400 duration-100 text-lg w-24 px-2"
            >
              {t("charging")}
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-blue-500 text-black hover:bg-blue-400 duration-100 text-lg w-24 px-2"
            >
              {t("edit-confirm")}
            </button>
          )}
        </form>
      </div>
    </DialogContainer>
  );
}

export default EditBookPopUp;

interface Props {
  data: any;
  documentId: string;
}
