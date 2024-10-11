import type { Component } from "@/utils/types";
import { CoffeeIcon, CoinsIcon, Heart as Icon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";

function DonationsPopUp(): Component {
  const [t] = useTranslation("global");

  return (
    <DialogContainer id="donations">
      <HeaderPopUp icon={<Icon size={25} />} title={t("donations")} />
      <p className="text-lg sm:text-xl text-center w-full text-pretty sm:px-4 text-slate-200">
        {t("donations-text")}
      </p>
      <div className="w-full flex flex-col gap-y-4 justify-center items-center">
        <Link
          href="https://cafecito.app/gixilym"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-4 px-4 py-2 rounded-lg border-2 border-rose-300 bg-rose-400 duration-100 hover:bg-rose-400/90 text-black font-semibold w-full max-w-[300px]">
          <CoffeeIcon size={25} />
          <span className="tracking-wide">{t("buy-coffee")}</span>
        </Link>
        <Link
          href="https://paypal.com/paypalme/gixilym"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-4 px-4 py-2 rounded-lg border-2 border-blue-300 bg-blue-400 duration-100 hover:bg-blue-400/90 text-black w-full max-w-[300px]">
          <CoinsIcon size={25} />
          <span className="tracking-wide font-semibold">{t("paypal")}</span>
        </Link>
      </div>

      <p className="text-xl text-center w-full">❤️ {t("thanks")} ❤️</p>
      <div className="modal-action pt-1 w-full">
        <ClosePopUpBtn id="donations" />
      </div>
    </DialogContainer>
  );
}

export default DonationsPopUp;
