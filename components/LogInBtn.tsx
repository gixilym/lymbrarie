"use client";
import type { Component } from "@/utils/types";
import { LogIn as LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

function LogInBtn({ inHeader }: { inHeader?: boolean }): Component {
  const [t] = useTranslation("global");
  return (
    <>
      {inHeader && <div className="divider px-40" />}
      <button
        onClick={() => signIn()}
        className="cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg
      border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:scale-95 hover:outline-b-[6px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-lg font-semibold tracking-wider flex flex-row justify-start items-center gap-x-3"
      >
        {t("log-in")}
        <LogInIcon size={28} />
      </button>
    </>
  );
}

export default LogInBtn;
