import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import { AlertCircle as Icon } from "lucide-react";

function AccelerationPopUp(): Component {
  const [t] = useTranslation("global");
  const [show, setShow] = useLocalStorage("acceleration", true);

  if (!show) return <></>;

  return (
    <DialogContainer divClass="!h-[260px] !max-w-[600px] items-center justify-between mt-10">
      <HeaderPopUp icon={<Icon size={30} />} title={t("alert")} />
      <p className="text-center sm:text-xl text-lg text-pretty w-full px-4 text-slate-200">
        {t("hardware-msg")}
      </p>
      <button
        onClick={() => setShow(false)}
        className="bg-green-400 hover:bg-green-300 duration-100 text-2xl text-black px-6 py-2 rounded-md w-max uppercase font-semibold"
      >
        ok
      </button>
    </DialogContainer>
  );
}

export default AccelerationPopUp;
