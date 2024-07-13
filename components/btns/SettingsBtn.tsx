import type { Component } from "@/utils/types";
import { Pencil as Icon } from "lucide-react";

function SettingsBtn(): Component {
  return (
    <button className="btn btn-square btn-ghost mt-4 sm:mt-0 mb-1">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
    </button>
  );
}

export default SettingsBtn;
