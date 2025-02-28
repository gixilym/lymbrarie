import { notification } from "@/utils/notifications";
import type { Component } from "@/utils/types";
import { RotateCcw } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

function ResultsFrom({ queryVal, clearResults }: Props): Component {
  const [t] = useTranslation("global");

  function copyURL(): void {
    const url: string = window?.location?.href;
    notification("success", t("url-copied"));
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-sm p-4 rounded-xl border border-violet-500/20 w-full max-w-3xl">
      <div className="flex items-center gap-x-2">
        <p className="text-lg w-full line-clamp-1 pr-2">
          {t("results-from")}:{" "}
          <span
            className="cursor-pointer hover:text-violet-400 transition-colors underline decoration-dotted"
            onClick={copyURL}
          >
            {queryVal}
          </span>
        </p>
      </div>
      <button
        onClick={clearResults}
        type="button"
        className="btn btn-ghost btn-circle bg-slate-800/50 hover:bg-slate-800/80"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
}

export default ResultsFrom;

interface Props {
  queryVal: string;
  clearResults: () => void;
}
