import { notification } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { BOOK_HANDLER_URL, EMPTY_BOOK } from "@/utils/store";
import type {
  Book,
  Component,
  FormEvent,
  FormRef,
  InputEvent,
  Reference,
  RouterNavigation,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import DialogContainer from "../DialogContainer";
import ModalTitle from "./ModalTitle";
import usePopUp from "@/utils/hooks/usePopUp";

function NewBookPopUp({ allTitles }: { allTitles: string[] }): Component {
  const [t] = useTranslation("global"),
    { refresh }: RouterNavigation = useRouter(),
    formRef: FormRef = useRef<Reference>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { userEmail } = useUserEmail(),
    { closePopUp } = usePopUp(),
    { isLoading, startLoading, finishLoading } = useLoadContent();

  const handleStateChange = (state: string): void =>
    setBook({ ...book, state });

  function handleChange(event: InputEvent): void {
    const key: string = event.target?.name;
    const value: string = event.target?.value;
    setBook({ ...book, [key]: value });
  }

  async function newBook(event: FormEvent): Promise<void> {
    event.preventDefault();
    const title: string = book.title?.toLowerCase().trim() ?? "";
    const repeteadTitle: boolean = allTitles.includes(title);
    if (!title) return notification("error", "Nombre vacío");
    if (repeteadTitle) return notification("error", "Nombre repetido");
    const bookData: object = { ...book, owner: userEmail };
    startLoading();
    await axios.post(BOOK_HANDLER_URL, bookData);
    finishLoading();
    closePopUp("add_book");
    refresh();
  }

  return (
    <DialogContainer>
      <ModalTitle title={t("ModalNewBook.new-book")} />
      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <TitleIcon size={18} className="mt-0.5 mr-2" />
        <input
          disabled={isLoading}
          onChange={handleChange}
          name="title"
          type="text"
          className="grow px-1 h-14"
          placeholder={t("ModalNewBook.title")}
        />
      </label>

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <UserIcon size={18} className="mt-0.5 mr-2" />
        <input
          disabled={isLoading}
          onChange={handleChange}
          name="author"
          type="text"
          className="grow px-1 h-14"
          placeholder={t("ModalNewBook.author")}
        />
      </label>

      <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
        <GenderIcon size={18} className="mt-0.5 mr-2" />
        <input
          disabled={isLoading}
          list="gender-list"
          onChange={handleChange}
          name="gender"
          type="text"
          className="grow px-1 h-14"
          placeholder={t("ModalNewBook.gender")}
        />
      </label>

      <div className="join w-full space-x-2">
        <label
          className={twMerge(
            book?.state == "Borrowed" ? "w-2/4" : "w-full",
            "input input-bordered flex items-center sm:text-xl text-lg sm:w-full h-14"
          )}
        >
          <StateIcon size={18} className="mt-0.5" />
          <select
            disabled={isLoading}
            onChange={e => handleStateChange(e.target.value)}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full text-gray-400 focus:outline-0 h-14"
            defaultValue="Pending"
          >
            <option value="Reading">{t("ModalNewBook.state.reading")}</option>
            <option value="Read">{t("ModalNewBook.state.read")}</option>
            <option value="Pending">{t("ModalNewBook.state.pending")}</option>
            <option value="Borrowed">{t("ModalNewBook.state.borrowed")}</option>
          </select>
        </label>
        {book.state == "Borrowed" && (
          <label className="input input-bordered flex items-center sm:text-xl text-lg w-2/4 sm:w-full h-14">
            <BorrowedIcon size={18} className="mt-0.5 mr-2" />
            <input
              disabled={isLoading}
              onChange={handleChange}
              name="loaned"
              type="text"
              className="grow px-1"
              placeholder={t("ModalNewBook.loanedto")}
            />
          </label>
        )}
      </div>

      <div>
        <label className="input input-bordered flex items-center sm:text-xl text-lg h-14">
          <ImageIcon size={18} className="mt-0.5 mr-2" />
          <input
            disabled={isLoading}
            onChange={handleChange}
            name="image"
            type="text"
            className="grow px-1 text-md"
            placeholder={
              t("ModalNewBook.link") +
              "https://res.cloudinary.com/dgs55s8qh/image/upload/v1711510484/dvjjtuqhfjqtwh3vcf3p.webp"
            }
          />
        </label>
        <Link
          href="https://imagen-a-link.netlify.app"
          target="_blank"
          className="link text-slate-500 hover:text-slate-400 duration-75 text-md sm:text-lg"
        >
          {t("ModalNewBook.generate-link")}
        </Link>
      </div>

      <div className="modal-action pt-1">
        <form
          onSubmit={newBook}
          ref={formRef}
          method="dialog"
          className="space-x-2 font-public"
        >
          <button
            type="button"
            onClick={() => closePopUp("add_book")}
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
              {t("ModalNewBook.add")}
            </button>
          )}
        </form>
      </div>
    </DialogContainer>
  );
}

export default NewBookPopUp;
