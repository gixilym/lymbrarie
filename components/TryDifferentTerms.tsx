import { SearchXIcon } from "lucide-react";
import type { Component } from "@/utils/types";

function TryDifferentTerms(): Component {
  return (
    <div className="w-full max-w-lg flex flex-col items-center justify-center gap-y-6 bg-slate-900/40 backdrop-blur-sm p-8 rounded-xl border border-violet-500/20">
      <div className="bg-violet-500/20 p-4 rounded-full">
        <SearchXIcon size={40} className="text-violet-400" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-2xl">Sin coincidencias...</p>
        <p className="text-slate-400 text-sm">Revisa la ortografía o prueba con otro término</p>
      </div>
    </div>
  );
}

export default TryDifferentTerms;
