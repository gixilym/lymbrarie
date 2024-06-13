import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "./TitlePopUp";
import ClosePopUpBtn from "../ClosePopUpBtn";

function DonationsPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer divClass="justify-between">
      <PopUpTitle title={t("ModalDonations.title")} />
      <p className="text-2xl text-center">{t("ModalDonations.xd")}</p>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="donations" />
      </div>
    </DialogContainer>
  );
}

export default DonationsPopUp;
