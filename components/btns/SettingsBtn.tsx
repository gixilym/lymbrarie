import type { Component } from "@/utils/types";
import { Settings as SettingsIcon } from "lucide-react";

function SettingsBtn(): Component {
  return (
    <div tabIndex={0} role="button">
      <button className="btn btn-square btn-ghost w-8">
        <SettingsIcon size={35} />
      </button>
    </div>
  );
}

export default SettingsBtn;
