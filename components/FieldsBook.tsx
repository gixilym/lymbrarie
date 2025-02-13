import InputCover from "./InputCover";
import { GENDERS } from "@/utils/consts";
import { isEqual } from "es-toolkit";
import { tLC } from "@/utils/helpers";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import type { Component, InputEvent } from "@/utils/types";
import {
  UserRoundSearch as LentIcon,
  Type as CustomIcon,
  Tag as GenderIcon,
  Library as StateIcon,
  Italic as TitleIcon,
  User as UserIcon,
} from "lucide-react";
import type { ChangeEventHandler } from "react";

function FieldsBook(props: Props): Component {
  const {
      errorKey,
      handleChange,
      isLoading,
      setCusGenderVal,
      handleImage,
      isCustomGender,
      handleGender,
      handleState,
      isLent,
      defaultValueTitle = "",
      defaultValueAuthor = "",
      defaultValueGender = "",
      defaultValueState = "default",
      defaultValueLoaned = "",
    } = props,
    [t] = useTranslation("global"),
    applyGender: boolean = GENDERS.includes(tLC(defaultValueGender));

  return (
    <>
      <label
        htmlFor="title-input"
        className={twMerge(
          isEqual("title-input", errorKey) && "border-2 border-red-500",
          "input input-bordered flex items-center w-full text-sm sm:text-xl h-14"
        )}
      >
        <TitleIcon size={18} className="mr-1.5" />
        <input
          id="title-input"
          autoFocus
          disabled={isLoading}
          onChange={handleChange}
          defaultValue={defaultValueTitle}
          name="title"
          type="text"
          className="grow px-1 h-14 placeholder:text-slate-100 w-10/12"
          placeholder={t("placeholder-title")}
        />
      </label>

      <label
        htmlFor="author-input"
        className={twMerge(
          isEqual("author-input", errorKey) && "border-2 border-red-500",
          "input input-bordered flex items-center sm:text-xl w-full text-sm h-14"
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
            "grow px-1 h-14 w-10/12"
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
            className="select input-bordered pl-1.5 border-x-0 rounded-none sm:text-xl text-sm w-full focus:outline-0 h-14 text-slate-400"
            defaultValue={
              applyGender
                ? defaultValueGender
                : !defaultValueGender
                ? "default"
                : "custom"
            }
          >
            <option value="default" disabled>
              {t("literary-gender")}
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
              isEqual("gender-input", errorKey) && "border-2 border-red-500",
              "input input-bordered flex items-center sm:text-xl text-sm h-14 w-full"
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
              className="grow px-1 placeholder:text-slate-500 text-sm sm:text-xl w-full"
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
            isLent ? "w-2/4" : "w-full",
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
            className="select text-slate-400 input-bordered border-x-0 rounded-none sm:text-xl text-sm w-full focus:outline-0 h-14"
            defaultValue={defaultValueState}
          >
            <option value="default" disabled>
              {t("current-state")}
            </option>
            <option value="Reading">{t("new-book-reading")}</option>
            <option value="Read">{t("new-book-read")}</option>
            <option value="Pending">{t("new-book-pending")}</option>
            <option value="Lent">{t("new-book-lent")}</option>
          </select>
        </label>
        {isLent && (
          <label
            htmlFor="lent-input"
            className={twMerge(
              isEqual("lent-input", errorKey) && "border-2 border-red-500",
              "input input-bordered flex items-center sm:text-xl text-xs w-2/4 sm:w-full h-14"
            )}
          >
            <LentIcon size={18} className="mt-0.5 mr-2" />
            <input
              id="lent-input"
              disabled={isLoading}
              onChange={handleChange}
              name="loaned"
              defaultValue={defaultValueLoaned}
              type="text"
              className="grow px-1 text-sm sm:text-xl w-full "
              placeholder={t("loanedto")}
            />
          </label>
        )}
      </div>

      <InputCover isLoading={isLoading} handleImage={handleImage} />

      {/* <div className="w-full">
        <label
          htmlFor="image-input"
          className={twMerge(
            isEqual("image-input", errorKey) && "border-2 border-red-500",
            "input input-bordered flex items-center sm:text-xl w-full text-sm h-14 mb-1"
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
                : "placeholder:text-slate-400",
              "grow px-1 w-10/12"
            )}
            placeholder={t("placeholder-link")}
          />
        </label>
      </div> */}
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
  handleImage: (newURL: string) => void;
  isLent: boolean;
  defaultValueTitle?: string;
  defaultValueAuthor?: string;
  defaultValueGender?: string;
  defaultValueState?: string;
  defaultValueLoaned?: string;
  defaultValueImg?: string;
}
