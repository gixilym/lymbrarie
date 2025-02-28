import { SquareLibrary } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function IndexBanner({ username }: { username: string }): Component {
  const isSpanish: boolean = useTranslation("global").i18n.language == "es";

  return (
    <div className="hidden md:flex w-full max-w-3xl flex-col items-center justify-center gap-y-6 bg-slate-900/40 rounded-2xl p-8 backdrop-blur-sm border border-violet-500/20 h-[260px]">
      <div className="bg-violet-500/20 p-4 rounded-full relative">
        <SquareLibrary size={40} className="text-violet-400" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-semibold text-slate-200 text-balance w-full text-center">
        {isSpanish ? `Biblioteca de ${username}` : `${username}'s Library`}
      </h1>
    </div>
  );
}

export default IndexBanner;
