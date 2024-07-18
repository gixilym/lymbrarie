import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import { AlertCircle as Icon } from "lucide-react";

function UpdatesPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer divClass="justify-between items-center">
      <HeaderPopUp
        icon={<Icon size={25} />}
        title={t("Lymbrarie se ha actualizado")}
      />
      <p className="text-xl sm:text-2xl w-full max-w-lg text-start text-slate-200">
        {t("Novedades")}
      </p>
      <ul className="text-lg sm:text-xl w-full max-w-lg text-slate-200">
        <li>Ahora puedes etiqutar tus libros como favorito desde el menú.</li>
        <li>Diseño adaptado a móvil.</li>
      </ul>

      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="support" />
      </div>
    </DialogContainer>
  );
}

export default UpdatesPopUp;
