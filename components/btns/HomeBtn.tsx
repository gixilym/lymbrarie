import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import {
  Home as HomIcon,
  Bolt as SettingsIcon,
  User as UserIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

function HomeBtn({ isLogged }: { isLogged: boolean }): Component {
  const [t] = useTranslation("global");
  const { openPopUp } = usePopUp();

  return (
    <div className="mt-1 dropdown dropdown-right dropdown-left">
      <div tabIndex={0} role="button">
        <button className="btn btn-square btn-ghost">
          <HomIcon size={28} />
        </button>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-y-1"
      >
        {isLogged && (
          <li onClick={() => openPopUp("profile")}>
            <div className="flex flex-row items-center justify-start gap-x-3">
              <UserIcon size={20} />
              <p>{t("profile")}</p>
            </div>
          </li>
        )}

        <li onClick={() => openPopUp("settings")}>
          <div className="flex flex-row items-center justify-start gap-x-3">
            <SettingsIcon size={18} />
            <p>{t("settings")}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default HomeBtn;
