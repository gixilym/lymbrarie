import type { Component } from "@/utils/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "../TitlePopUp";

function SupportPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer divClass="justify-between items-center">
      <PopUpTitle title={t("support")} />
      <p className="text-xl sm:text-2xl text-center sm:px-4 text-pretty">
        {t("text-support")}
      </p>
      <address className="text-xl sm:text-3xl no-underline link text-blue-400 hover:text-blue-300 cursor-pointer duration-75">
        <Link href="mailto:gixi.tsx@gmail.com" target="_blank" rel="noreferrer">
          gixi.tsx@gmail.com
        </Link>
      </address>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="support" />
      </div>
    </DialogContainer>
  );
}

export default SupportPopUp;
