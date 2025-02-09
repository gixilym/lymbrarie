import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import LogInBtn from "../btns/LogInBtn";
import { Ghost as Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function LogInPopUp(): Component {
  const [t] = useTranslation("global");
  return (
    <DialogContainer id="login" divClass="items-center">
      <HeaderPopUp icon={<Icon size={30} />} title={t("guest-mode")} />
      <p className="text-lg sm:text-2xl tracking-wide text-center sm:px-6 text-pretty text-slate-300">
        {t("login-fn")}
      </p>

      <div className="modal-action pt-1 w-full justify-center items-center">
        <LogInBtn />
      </div>
    </DialogContainer>
  );
}

export default LogInPopUp;
