import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { LogOut as LogOutIcon } from "lucide-react";
import { NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function LogOutBtn(): Component {
  const [t] = useTranslation("global"),
    { push }: NextRouter = useRouter(),
    { closePopUp } = usePopUp();

  function bayBay(): void {
    closePopUp("profile");
    push("/logout");
  }

  return (
    <button
      onClick={bayBay}
      className="-z-1 cursor-pointer transition-all bg-red-500 text-white px-4 py-2 rounded-xl
      border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:scale-95 hover:outline-b-[6px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px] sm:text-lg text-sm font-semibold tracking-wider opacity-85 flex flex-row justify-start items-center gap-x-3"
    >
      <p>{t("logout")}</p>
      <LogOutIcon size={28} />
    </button>
  );
}

export default LogOutBtn;
