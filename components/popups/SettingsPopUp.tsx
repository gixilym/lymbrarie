import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component, SelectEvent } from "@/utils/types";
import {
  Languages as LanguagesIcon,
  Palette as PalletIcon,
  Sparkles as AnimationsIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";

function SettingsPopUp(): Component {
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useLocalStorage("language");
  const [animations, setAnimations] = useLocalStorage("animations", "true");

  return (
    <DialogContainer divClass="justify-between">
      <PopUpTitle title={t("settings")} />

      <div className="w-full flex flex-col justify-start items-center gap-y-10">
        <div className="w-full sm:w-[90%] flex justify-between items-center gap-x-6 sm:gap-x-0">
          <label
            htmlFor="select-language"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <LanguagesIcon size={25} />
            {t("language")}
          </label>
          <select
            onChange={(e: SelectEvent) => {
              i18n.changeLanguage(e.target.value);
              setLanguage(e.target.value);
            }}
            id="select-language"
            className="select select-bordered sm:w-full max-w-xs w-[230px] text-lg text-center"
            value={language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="w-full sm:w-[90%] flex justify-between items-center gap-x-6 sm:gap-x-0">
          <label
            htmlFor="select-animations"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <AnimationsIcon size={25} />
            {t("animations")}
          </label>
          <button
            onClick={() => {
              setAnimations(!animations);
              location.reload();
            }}
            id="select-animations"
            className="w-[230px] sm:w-full max-w-xs text-lg border border-gray-700 h-11 rounded-xl text-center pr-5"
          >
            {animations ? t("enabled") : t("disabled")}
          </button>
        </div>

        <div className="w-full sm:w-[90%] flex justify-between items-center gap-x-6 sm:gap-x-0">
          <label
            htmlFor="select-theme"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <PalletIcon size={25} />
            {t("theme")}
          </label>
          <select
            id="select-theme"
            className="select select-bordered w-[230px] sm:w-full max-w-xs text-lg text-center"
            disabled
            defaultValue="dark"
          >
            <option value="dark">{t("dark")}</option>
            <option value="light">{t("light")}</option>
          </select>
        </div>
      </div>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="settings" />
      </div>
    </DialogContainer>
  );
}

export default SettingsPopUp;
