import type { Component } from "@/utils/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";

function DonationsPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer divClass="justify-between">
      <PopUpTitle title={t("donations")} />
      <p className="text-lg sm:text-xl text-center w-full text-pretty sm:px-4">
        {t("donations-text")}
      </p>
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://paypal.com/paypalme/gixilym"
        className="link text-xl sm:text-2xl text-blue-400 hover:text-blue-300 cursor-pointer duration-75 w-full text-center"
      >
        {t("paypal")}
      </Link>
      <p className="text-xl text-center w-full">❤️ {t("thanks")} ❤️</p>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="donations" />
      </div>
    </DialogContainer>
  );
}

export default DonationsPopUp;
