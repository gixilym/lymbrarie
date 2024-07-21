import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component, SelectEvent } from "@/utils/types";
import {
  Languages as LanguagesIcon,
  Palette as PalletIcon,
  Sparkles as AnimationsIcon,
  Library as StateIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import { type NextRouter, useRouter } from "next/router";

function SettingsPopUp(): Component {
  const [t, i18n] = useTranslation("global"),
    { reload }: NextRouter = useRouter(),
    [language, setLanguage] = useLocalStorage("language", "en"),
    [animations, setAnimations] = useLocalStorage("animations", true),
    [state, setState] = useLocalStorage("state", true);

  return (
    <DialogContainer id="settings" divClass="justify-between">
      <HeaderPopUp icon={<SettingsIcon size={25} />} title={t("settings")} />

      <div className="w-full flex flex-col justify-start items-center gap-y-10 text-slate-200">
        <div className="w-full sm:w-[90%] flex flex-col sm:flex-row gap-y-2 justify-between items-center gap-x-3 sm:gap-x-0">
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
            className="select select-bordered sm:w-full max-w-xs w-[180px] text-lg text-center"
            value={language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="w-full sm:w-[90%] flex flex-col gap-y-2 sm:flex-row justify-between items-center gap-x-3 sm:gap-x-0">
          <label
            htmlFor="enabled-animations"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <AnimationsIcon size={25} />
            {t("animations")}
          </label>
          <button
            onClick={() => {
              setAnimations(!animations);
              reload();
            }}
            id="enabled-animations"
            className="w-[180px] sm:w-full max-w-xs text-lg border border-gray-700 h-11 rounded-xl text-center pr-5"
          >
            {animations ? t("enabled") : t("disabled")}
          </button>
        </div>

        <div className="w-full sm:w-[90%] flex flex-col gap-y-2 sm:flex-row justify-between items-center gap-x-3 sm:gap-x-0">
          <label
            htmlFor="hidden-state"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <StateIcon size={25} />
            {t("show-state")}
          </label>
          <button
            onClick={() => {
              setState(!state);
              reload();
            }}
            id="hidden-state"
            className="w-[180px] sm:w-full max-w-xs text-lg border border-gray-700 h-11 rounded-xl text-center pr-5"
          >
            {state ? t("enabled") : t("disabled")}
          </button>
        </div>

        <div className=" w-full sm:w-[90%] flex flex-col gap-y-2 sm:flex-row justify-between items-center gap-x-3 sm:gap-x-0">
          <label
            htmlFor="select-theme"
            className="sm:text-xl text-lg flex justify-start items-center gap-x-3"
          >
            <PalletIcon size={25} />
            {t("theme")}
          </label>
          <select
            id="select-theme"
            className="capitalize select select-bordered w-[180px] sm:w-full max-w-xs text-lg text-center"
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
