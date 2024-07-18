import type { Component } from "@/utils/types";
import { Pencil as Icon } from "lucide-react";

function SettingsBtn(): Component {
  return (
    <button className="btn btn-square bg-slate-700/30 sm:bg-slate-700/15 hover:bg-slate-700/50 border-2 mt-4 sm:mt-0 mb-1">
      <Icon className="w-6 h-6 sm:w-7 sm:h-8" />
    </button>
  );
}

export default SettingsBtn;
