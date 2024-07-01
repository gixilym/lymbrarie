import type { Component } from "@/utils/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";

function SupportPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer divClass="justify-between items-center">
      <PopUpTitle title={t("support")} />
      <p className="text-2xl text-center">
        {t("text-support")}
        <b>
          <i>Lymbrarie</i>
        </b>
      </p>
      <address className="text-2xl link text-blue-500">
        <Link href="mailto:gixipixel@gmail.com" target="_blank">
          gixipixel@gmail.com
        </Link>
      </address>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="support" />
      </div>
    </DialogContainer>
  );
}

export default SupportPopUp;
