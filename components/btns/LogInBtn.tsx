import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import usePopUp from "@/hooks/usePopUp";

function LogInBtn(): Component {
  const [t] = useTranslation("global");
  const { closePopUp } = usePopUp();

  return (
    <Link
      href="/"
      onClick={() => closePopUp("login")}
      className="cursor-pointer transition-all font-thin bg-blue-700 hover:bg-blue-700/80 text-white px-4 py-4 rounded-xl border-blue-600 border-b-[4px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-sm tracking-wider opacity-85 flex-row justify-start items-center gap-x-3"
    >
      {t("login-start")}
    </Link>
  );
}

export default LogInBtn;
