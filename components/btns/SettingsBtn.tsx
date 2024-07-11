import type { Component } from "@/utils/types";
import { Pencil as SettingsIcon } from "lucide-react";

function SettingsBtn(): Component {
  return (
    <div tabIndex={0} role="button">
      <button className="btn btn-square btn-ghost">
        <SettingsIcon size={28} />
      </button>
    </div>
  );
}

export default SettingsBtn;
