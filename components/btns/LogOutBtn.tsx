import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { LogOut as Icon } from "lucide-react";
import { type NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function LogOutBtn(): Component {
  const [t] = useTranslation("global");
  const { push }: NextRouter = useRouter();
  const { closePopUp } = usePopUp();

  return (
    <button
      onClick={() => {
        push("/logout");
        closePopUp("profile");
      }}
      className="-z-1 cursor-pointer transition-all font-thin bg-red-700 hover:bg-red-700/80 text-white px-4 py-2 rounded-xl
      border-red-600 border-b-[4px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px] sm:text-lg text-sm tracking-wider opacity-85 flex flex-row justify-start items-center gap-x-3"
    >
      <p>{t("go-out")}</p>
      <Icon size={28} />
    </button>
  );
}

export default LogOutBtn;
