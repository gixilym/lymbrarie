import type { Component } from "@/utils/types";
import { LogIn as Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

function LogInBtn(): Component {
  const [t] = useTranslation("global");

  return (
    <>
      <div className="divider px-40" />
      <button
        onClick={() => signIn()}
        className="h-12 cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg
      border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:scale-95 hover:outline-b-[6px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-lg font-semibold tracking-wider flex flex-row justify-start items-center gap-x-3"
      >
        {t("log-in")}
        <Icon size={28} />
      </button>
    </>
  );
}

export default LogInBtn;
