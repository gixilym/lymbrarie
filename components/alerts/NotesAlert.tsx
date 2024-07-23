import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";

function NotesAlert(): Component {
  const [t] = useTranslation("global");

  return (
    <div
      role="alert"
      className="alert alert-error bg-red-400 font-semibold text-sm sm:text-[16px] flex justify-start items-end mb-10 sm:mb-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-start">{t("error-wifi-notes")}</span>
    </div>
  );
}

export default NotesAlert;
