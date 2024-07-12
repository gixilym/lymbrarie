import type { Component } from "@/utils/types";
import { Pencil as SettingsIcon } from "lucide-react";

function SettingsBtn(): Component {
  return (
    <div tabIndex={0} role="button">
      <button className="btn btn-square btn-ghost mt-4 sm:mt-0">
        <SettingsIcon className="w-6 h-6 sm:w-9 sm:h-9" />
      </button>
    </div>
  );
}

export default SettingsBtn;
