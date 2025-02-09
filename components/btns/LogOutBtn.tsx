import useLocalStorage from "@/hooks/useLocalStorage";
import { Auth, getAuth } from "firebase/auth";
import { clearStorage } from "@/utils/helpers";
import { LogOut as Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import usePopUp from "@/hooks/usePopUp";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

function LogOutBtn(): Component {
  const auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    [lang, setLang] = useLocalStorage("language", "es"),
    [animations, setAnimations] = useLocalStorage("animations", true),
    [state, setState] = useLocalStorage("state", true),
    path: string = usePathname();

  function forgetSession(): void {
    clearStorage();
    setLang(lang);
    setAnimations(animations);
    setState(state);
    closePopUp("profile");
    auth.signOut();
  }

  return (
    <button
      onClick={forgetSession}
      className={twMerge(
        path.includes("/guest") ? "hidden" : "flex",
        "-z-1 cursor-pointer transition-all font-thin bg-red-700 hover:bg-red-700/80 text-white px-4 py-2 rounded-xl border-red-600 border-b-[4px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] sm:text-[16px] text-sm tracking-wider opacity-85 flex-row justify-start items-center gap-x-3 absolute bottom-4"
      )}
    >
      {t("logout")}
      <Icon size={26} />
    </button>
  );
}

export default LogOutBtn;
