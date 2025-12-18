import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import LogInBtn from "../btns/LogInBtn";
import { Ghost as Icon } from "lucide-react";
import type { Component } from "@/utils/types";

function LogInPopUp(): Component {
  return (
    <DialogContainer id="login" divClass="items-center">
      <HeaderPopUp icon={<Icon size={30} />} title="Modo invitado" />
      <p className="text-lg sm:text-2xl tracking-wide text-center sm:px-8 py-6 text-balance text-slate-300/90 font-light w-full">
        Inicia sesión para acceder a tu perfil
      </p>
      <div className="modal-action w-full flex justify-center items-center pb-28 md:pb-10">
        <LogInBtn />
      </div>
    </DialogContainer>
  );
}

export default LogInPopUp;
