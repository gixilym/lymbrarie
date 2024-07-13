import { GENDERS } from "@/utils/consts";
import { tLC } from "@/utils/helpers";
import type { Component, InputEvent } from "@/utils/types";
import {
  UserRoundSearch as BorrowedIcon,
  Type as CustomIcon,
  Tag as GenderIcon,
  Image as ImageIcon,
  Library as StateIcon,
  Italic as TitleIcon,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import type { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

function FieldsBook(props: Props): Component {
  const {
      errorKey,
      handleChange,
      isLoading,
      setCusGenderVal,
      isCustomGender,
      handleGender,
      handleState,
      isLoaned,
      defaultValueTitle = "",
      defaultValueAuthor = "",
      defaultValueGender = "",
      defaultValueState = "default",
      defaultValueLoaned = "",
      defaultValueImg = "",
    } = props,
    [t] = useTranslation("global"),
    applyGender: boolean = GENDERS.includes(tLC(defaultValueGender));

  return (
    <>
      <label
        htmlFor="title-input"
        className={twMerge(
          "title-input" == errorKey && "border-2 border-red-500",
          "input input-bordered flex items-center sm:text-xl text-lg h-14"
        )}
      >
        <TitleIcon size={18} className="mt-0.5 mr-2" />
        <input
          id="title-input"
          autoFocus
          disabled={isLoading}
          onChange={handleChange}
          defaultValue={defaultValueTitle}
          name="title"
          type="text"
          className="grow px-1 h-14  placeholder:text-slate-100"
          placeholder={t("placeholder-title")}
        />
      </label>

      <label
        htmlFor="author-input"
        className={twMerge(
          "author-input" == errorKey && "border-2 border-red-500",
          "input input-bordered flex items-center sm:text-xl text-lg h-14"
        )}
      >
        <UserIcon size={18} className="mt-0.5 mr-2" />
        <input
          id="author-input"
          disabled={isLoading}
          onChange={handleChange}
          defaultValue={defaultValueAuthor}
          name="author"
          type="text"
          className={twMerge(
            isLoading
              ? "placeholder:!text-slate-700"
              : "placeholder:text-slate-100",
            "grow px-1 h-14"
          )}
          placeholder={t("placeholder-author")}
        />
      </label>

      <div className="join w-full space-x-2">
        <label
          htmlFor="gender-select"
          className={twMerge(
            isLoading ? "bg-base-200" : "bg-transparent input-bordered",
            "w-full input flex items-center sm:text-xl text-lg h-14 sm:w-full"
          )}
        >
          <GenderIcon
            size={18}
            className={twMerge(
              isLoading ? "opacity-20" : "opacity-100",
              "mt-0.5 mr-2"
            )}
          />
          <select
            id="gender-select"
            onChange={handleGender}
            disabled={isLoading}
            className="select input-bordered pl-1.5 border-x-0 rounded-none sm:text-xl text-lg w-full focus:outline-0 h-14"
            defaultValue={
              applyGender
                ? defaultValueGender
                : !defaultValueGender
                ? "default"
                : "custom"
            }
          >
            <option value="default" disabled>
              {t("placeholder-gender")}
            </option>
            {GENDERS.map((g: string) => (
              <option value={g} key={g}>
                {t(g)}
              </option>
            ))}
          </select>
        </label>
        {isCustomGender && (
          <label
            htmlFor="gender-input"
            className={twMerge(
              "gender-input" == errorKey && "border-2 border-red-500",
              "input input-bordered flex items-center sm:text-xl text-lg h-14 w-2/4 sm:w-full"
            )}
          >
            <CustomIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="gender-input"
              onChange={(e: InputEvent) => {
                handleChange(e);
                setCusGenderVal(e.target.value);
              }}
              name="gender"
              disabled={isLoading}
              type="text"
              className="grow px-1 placeholder:text-slate-500"
              placeholder={t("custom")}
              defaultValue={applyGender ? t("my-gender") : defaultValueGender}
            />
          </label>
        )}
      </div>

      <div className="join w-full space-x-2">
        <label
          htmlFor="state-select"
          className={twMerge(
            isLoaned ? "w-2/4" : "w-full",
            isLoading ? "bg-base-200" : "bg-transparent input-bordered",
            "input flex items-center sm:text-xl text-lg sm:w-full h-14"
          )}
        >
          <StateIcon
            size={18}
            className={twMerge(
              isLoading ? "opacity-20" : "opacity-100",
              "mt-0.5"
            )}
          />
          <select
            id="state-select"
            disabled={isLoading}
            onChange={e => handleState(e.target.value)}
            className="select input-bordered border-x-0 rounded-none sm:text-xl text-lg w-full focus:outline-0 h-14"
            defaultValue={defaultValueState}
          >
            <option value="default" disabled>
              {t("state")}
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
            className={twMerge(
              "loaned-input" == errorKey && "border-2 border-red-500",
              "input input-bordered flex items-center sm:text-xl text-lg w-2/4 sm:w-full h-14"
            )}
          >
            <BorrowedIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="loaned-input"
              disabled={isLoading}
              onChange={handleChange}
              name="loaned"
              defaultValue={defaultValueLoaned}
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
          className={twMerge(
            "image-input" == errorKey && "border-2 border-red-500",
            "input input-bordered flex items-center sm:text-xl text-lg h-14"
          )}
        >
          <ImageIcon size={18} className="mt-0.5 mr-2" />
          <input
            id="image-input"
            disabled={isLoading}
            onChange={handleChange}
            defaultValue={defaultValueImg}
            name="image"
            type="text"
            className={twMerge(
              isLoading
                ? "placeholder:text-slate-700"
                : "placeholder:text-slate-100",
              "grow px-1 text-md"
            )}
            placeholder={t("placeholder-link")}
          />
        </label>
        <Link
          href="https://imagen-a-link.netlify.app"
          target="_blank"
          className={twMerge(
            isLoading
              ? "text-slate-600 cursor-default"
              : "link text-slate-300 hover:text-slate-200",
            " duration-75 text-md sm:text-lg"
          )}
        >
          {t("generate-link")}
        </Link>
      </div>
    </>
  );
}

export default FieldsBook;

interface Props {
  errorKey: string;
  handleChange: (e: InputEvent) => void;
  isLoading?: boolean;
  setCusGenderVal: (value: string) => void;
  isCustomGender: boolean;
  handleGender: ChangeEventHandler<HTMLSelectElement>;
  handleState: (state: string) => void;
  isLoaned: boolean;
  defaultValueTitle?: string;
  defaultValueAuthor?: string;
  defaultValueGender?: string;
  defaultValueState?: string;
  defaultValueLoaned?: string;
  defaultValueImg?: string;
}
