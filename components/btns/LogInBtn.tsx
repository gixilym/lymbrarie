import Link from "next/link";
import usePopUp from "@/hooks/usePopUp";
import { PAGES } from "@/utils/consts";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function LogInBtn(): Component {
  const [t] = useTranslation("global");
  const { closePopUp } = usePopUp();

  return (
    <Link
      href={PAGES.LOGIN}
      onClick={() => closePopUp("login")}
      className="cursor-pointer transition-all font-medium bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-4 rounded-xl border-b-4 border-blue-900 active:border-b-2 active:brightness-95 active:translate-y-[1px] text-sm tracking-wide shadow-md flex items-center gap-x-3 duration-100"
    >
      {t("login-start")}
    </Link>
  );
}

export default LogInBtn;
