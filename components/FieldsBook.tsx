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
          "flex items-center w-full bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
          "border border-violet-500/20 hover:border-violet-500/30 transition-colors",
          isEqual("title-input", errorKey) && "!border-red-500/50 !border-2"
        )}
      >
        <TitleIcon size={18} className="text-violet-300 mr-3" />
        <input
          id="title-input"
          autoFocus
          disabled={isLoading}
          onChange={handleChange}
          defaultValue={defaultValueTitle}
          name="title"
          type="text"
          className="w-full bg-slate-900 text-slate-200 text-lg placeholder:text-slate-300
              focus:outline-none disabled:opacity-50"
          placeholder={t("placeholder-title")}
        />
      </label>

      <label
        htmlFor="author-input"
        className={twMerge(
          "flex items-center w-full bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
          "border border-violet-500/20 hover:border-violet-500/30 transition-colors",
          isEqual("author-input", errorKey) && "!border-red-500/50 !border-2"
        )}
      >
        <UserIcon size={18} className="text-violet-300 mr-3" />
        <input
          id="author-input"
          disabled={isLoading}
          onChange={handleChange}
          defaultValue={defaultValueAuthor}
          name="author"
          type="text"
          className="w-full bg-slate-900 text-slate-200 text-lg placeholder:text-slate-300
              focus:outline-none disabled:opacity-50"
          placeholder={t("placeholder-author")}
        />
      </label>

      <div className="flex gap-x-3 w-full">
        <label
          htmlFor="gender-select"
          className={twMerge(
            "flex items-center flex-1 bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
            "border border-violet-500/20 hover:border-violet-500/30 transition-colors"
          )}
        >
          <GenderIcon size={18} className="text-violet-300 mr-3" />
          <select
            id="gender-select"
            onChange={handleGender}
            disabled={isLoading}
            defaultValue={
              applyGender
                ? defaultValueGender
                : !defaultValueGender
                ? "default"
                : "custom"
            }
            className="w-full bg-slate-900 text-slate-300 text-lg focus:outline-none disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="default" disabled className="bg-slate-900">
              {t("literary-gender")}
            </option>
            {GENDERS.map((g: string) => (
              <option key={g} value={g} className="bg-slate-900">
                {t(g)}
              </option>
            ))}
          </select>
        </label>

        {isCustomGender && (
          <label
            htmlFor="gender-input"
            className={twMerge(
              "flex items-center flex-1 bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
              "border border-violet-500/20 hover:border-violet-500/30 transition-colors",
              isEqual("gender-input", errorKey) &&
                "!border-red-500/50 !border-2"
            )}
          >
            <CustomIcon size={18} className="text-violet-300 mr-3" />
            <input
              id="gender-input"
              onChange={(e: InputEvent) => {
                handleChange(e);
                setCusGenderVal(e.target.value);
              }}
              name="gender"
              disabled={isLoading}
              type="text"
              className="w-full bg-slate-900 text-slate-200 text-lg placeholder:text-slate-300
                  focus:outline-none disabled:opacity-50"
              placeholder={t("custom")}
              defaultValue={applyGender ? t("my-gender") : defaultValueGender}
            />
          </label>
        )}
      </div>

      <div className="flex gap-x-3 w-full">
        <label
          htmlFor="state-select"
          className={twMerge(
            "flex items-center bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
            "border border-violet-500/20 hover:border-violet-500/30 transition-colors",
            isLent ? "w-1/2" : "w-full"
          )}
        >
          <StateIcon size={18} className="text-violet-300 mr-3" />
          <select
            id="state-select"
            disabled={isLoading}
            onChange={e => handleState(e.target.value)}
            defaultValue={defaultValueState}
            className="w-full bg-slate-900 text-slate-300 text-lg 
                focus:outline-none disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="default" disabled className="bg-slate-900">
              {t("current-state")}
            </option>
            <option value="Reading" className="bg-slate-900">
              {t("new-book-reading")}
            </option>
            <option value="Read" className="bg-slate-900">
              {t("new-book-read")}
            </option>
            <option value="Pending" className="bg-slate-900">
              {t("new-book-pending")}
            </option>
            <option value="Lent" className="bg-slate-900">
              {t("new-book-lent")}
            </option>
          </select>
        </label>

        {isLent && (
          <label
            htmlFor="lent-input"
            className={twMerge(
              "flex items-center w-1/2 bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14",
              "border border-violet-500/20 hover:border-violet-500/30 transition-colors",
              isEqual("lent-input", errorKey) && "!border-red-500/50 !border-2"
            )}
          >
            <LentIcon size={18} className="text-violet-300 mr-3" />
            <input
              id="lent-input"
              disabled={isLoading}
              onChange={handleChange}
              name="loaned"
              defaultValue={defaultValueLoaned}
              type="text"
              className="w-full bg-slate-900 text-slate-200 text-lg placeholder:text-slate-300
                  focus:outline-none disabled:opacity-50"
              placeholder={t("loanedto")}
            />
          </label>
        )}
      </div>

      <InputCover isLoading={isLoading} handleImage={handleImage} />
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
