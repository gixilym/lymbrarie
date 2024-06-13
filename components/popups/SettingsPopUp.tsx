import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import {
  Languages as LanguagesIcon,
  Palette as PalletIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";

function SettingsPopUp(): Component {
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useLocalStorage("language");

  return (
    <DialogContainer divClass="justify-between">
      <PopUpTitle title={t("ModalSettings.settings")} />
      <div className="w-full flex flex-col justify-start items-center gap-y-6">
        <div className="w-full sm:w-[90%] flex justify-between items-center gap-x-6 sm:gap-x-0">
          <label
            htmlFor="select-language"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <LanguagesIcon size={25} />
            {t("ModalSettings.language")}
          </label>
          <select
            onChange={e => {
              i18n.changeLanguage(e.target.value);
              setLanguage(e.target.value);
            }}
            id="select-language"
            className="select select-bordered sm:w-full max-w-xs w-[230px] text-lg"
            value={language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="w-full sm:w-[90%] flex justify-between items-center gap-x-6 sm:gap-x-0">
          <label
            htmlFor="select-theme"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <PalletIcon size={25} />
            {t("ModalSettings.theme")}
          </label>
          <select
            id="select-theme"
            className="select select-bordered w-[230px] sm:w-full max-w-xs text-lg"
            disabled
            defaultValue="dark"
          >
            <option value="dark">{t("ModalSettings.dark")}</option>
            <option value="light">{t("ModalSettings.light")}</option>
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
