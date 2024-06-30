import { notification } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import usePopUp from "@/utils/hooks/usePopUp";
import useUserEmail from "@/utils/hooks/useUserEmail";
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
  Ampersand as GenderIcon,
  Image as ImageIcon,
  Type as CustomIcon,
  Library as StateIcon,
  Italic as TitleIcon,
  User as UserIcon,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, type Reference, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";

function NewBookPopUp({ allTitles }: { allTitles: string[] }): Component {
  const [t] = useTranslation("global"),
    { userEmail } = useUserEmail(),
    { closePopUp } = usePopUp(),
    { refresh }: AppRouterInstance = useRouter(),
    formRef: FormRef = useRef<Reference>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [isCustomGender, setIsCustomGender] = useState<boolean>(false),
    handleState = (state: string): void => setBook({ ...book, state });

  function handleChange(event: InputEvent): void {
    const key: string = event.target?.name;
    const value: string = event.target?.value;
    setBook({ ...book, [key]: value });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value;
    setBook({ ...book, gender });
    setIsCustomGender(gender == "custom");
  }

  async function newBook(event: FormEvent): Promise<void> {
    event.preventDefault();
    const title: string = book.title?.toLowerCase().trim() ?? "";
    const repeteadTitle: boolean = allTitles.includes(title);
    if (!title) return notification("error", t("empty-title"));
    if (repeteadTitle) return notification("error", t("repeated-title"));
    const bookData: object = { ...book, owner: userEmail };
    startLoading();
    await axios.post(BOOK_HANDLER_URL, bookData);
    finishLoading();
    closePopUp("add_book");
    refresh();
  }

  return (
    <DialogContainer>
      <PopUpTitle title={t("new-book")} />
      <label
        htmlFor="title-input"
        className="input input-bordered flex items-center sm:text-xl text-lg h-14"
      >
        <TitleIcon size={18} className="mt-0.5 mr-2" />
        <input
          id="title-input"
          disabled={isLoading}
          onChange={handleChange}
          name="title"
          type="text"
          className="grow px-1 h-14"
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
          disabled={isLoading}
          onChange={handleChange}
          name="author"
          type="text"
          className="grow px-1 h-14"
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
            defaultValue="default"
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
            book?.state == "Borrowed" ? "w-2/4" : "w-full",
            "input input-bordered flex items-center sm:text-xl text-lg sm:w-full h-14"
          )}
        >
          <StateIcon size={18} className="mt-0.5" />
          <select
            id="state-select"
            disabled={isLoading}
            onChange={e => handleState(e.target.value)}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full text-gray-400 focus:outline-0 h-14"
            defaultValue="Pending"
          >
            <option value="Reading">{t("new-book-reading")}</option>
            <option value="Read">{t("new-book-read")}</option>
            <option value="Pending">{t("new-book-pending")}</option>
            <option value="Borrowed">{t("new-book-borrowed")}</option>
          </select>
        </label>
        {book.state == "Borrowed" && (
          <label
            htmlFor="loaned-input"
            className="input input-bordered flex items-center sm:text-xl text-lg w-2/4 sm:w-full h-14"
          >
            <BorrowedIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="loaned-input"
              disabled={isLoading}
              onChange={handleChange}
              name="loaned"
              type="text"
              className="grow px-1"
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
            disabled={isLoading}
            onChange={handleChange}
            name="image"
            type="text"
            className="grow px-1 text-md"
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
              {t("add")}
            </button>
          )}
        </form>
      </div>
    </DialogContainer>
  );
}

export default NewBookPopUp;
