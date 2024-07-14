import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { WifiOff as Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import PopUpTitle from "../TitlePopUp";

function OfflinePopUp(): Component {
  const [t] = useTranslation("global");
  const { closePopUp } = usePopUp();

  return (
    <DialogContainer divClass="justify-between items-center">
      <div className="flex w-full justify-start gap-x-6 items-center">
        <Icon size={30} className="mb-2" />
        <PopUpTitle title={t("offline")} />
      </div>
      <p className="text-xl sm:text-2xl tracking-wide text-center sm:px-6 text-pretty text-slate-300">
        {t("text-offline")}
      </p>

      <div className="modal-action pt-1 w-full justify-center items-center">
        <button
          onClick={() => closePopUp("offline")}
          className="bg-green-500 border-2 border-green-600 hover:bg-green-400 text-2xl text-black px-6 py-2 rounded-md w-max uppercase font-semibold"
        >
          ok
        </button>
      </div>
    </DialogContainer>
  );
}

export default OfflinePopUp;
