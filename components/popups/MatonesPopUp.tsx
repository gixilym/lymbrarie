import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import ModalTitle from "./ModalTitle";

function MatonesPopUp(): Component {
  const [t] = useTranslation("global");
  const { closePopUp } = usePopUp();

  return (
    <DialogContainer>
      <ModalTitle title={t("ModalMatones")} />
      <div className="modal-action h-full items-end">
        <button
          type="button"
          onClick={() => closePopUp("matones")}
          className="btn text-lg w-24 px-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Ok
        </button>
      </div>
    </DialogContainer>
  );
}

export default MatonesPopUp;
