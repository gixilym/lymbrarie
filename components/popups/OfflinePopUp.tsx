import usePopUp from "@/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { WifiOff as Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";

function OfflinePopUp(): Component {
  const [t] = useTranslation("global");
  const { closePopUp } = usePopUp();

  return (
    <DialogContainer id="offline" divClass="items-center">
      <HeaderPopUp icon={<Icon size={30} />} title={t("offline")} />
      <p className="text-lg sm:text-2xl tracking-wide text-center sm:px-6 text-pretty text-slate-300">
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
