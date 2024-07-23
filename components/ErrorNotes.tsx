import { notification } from "@/utils/notifications";
import type { Component } from "@/utils/types";
import { delay } from "es-toolkit";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ErrorNotes({ notes }: { notes: string }): Component {
  const [t] = useTranslation("global");
  const { push } = useRouter();

  async function copy(): Promise<void> {
    notification("success", t("copied"));
    navigator.clipboard.writeText(notes);
    await delay(2500);
    push("/");
  }

  return (
    <div className="w-full h-full justify-start items-center flex flex-col pt-10 gap-y-10 text-slate-600 mx-4 sm:mx-0">
      <div className="flex flex-col justify-start items-center gap-y-6 w-full max-w-[700px]">
        <span className="text-xl md:text-3xl tracking-tight font-bold lg:text-4xl text-center uppercase text-red-400">
          {t("warning")}
        </span>
        <p className="text-lg md:text-2xl text-center w-full text-pretty px-2 md:px-0 text-red-400">
          {t("error-save-notes")}
        </p>
        <p className="text-sm md:text-xl text-center w-full text-pretty px-2 md:px-0 text-slate-200">
          {t("copy-notes")}
        </p>
      </div>

      <div className="w-full max-w-[700px] border border-rose-100/40 text-slate-300 p-4 rounded-lg bg-slate-900 flex justify-start gap-y-6 items-start flex-col h-full max-h-[300px] min-h-[200px]">
        <div className="flex justify-between items-center w-full">
          <strong className="text-lg sm:text-xl">{t("notes")}</strong>
          <button
            className="text-sm sm:text-lg bg-green-400 hover:bg-green-300 duration-100 hover:scale-105 rounded-lg p-2 sm:px-4 sm:py-2 text-black uppercase font-semibold"
            onClick={copy}
          >
            {t("copy")}
          </button>
        </div>
        <p className="text-sm overflow-y-auto">{notes}</p>
      </div>
    </div>
  );
}

export default ErrorNotes;
