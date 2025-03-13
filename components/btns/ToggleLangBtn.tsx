import useLocalStorage from "@/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import type { Component, Timer } from "@/utils/types";

function ToggleLangBtn(): Component {
  const [t] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("language", "es");

  return (
    <div className="flex items-center gap-x-2 justify-center [&>span]:text-sm">
      <span>ES</span>
      <input
        type="checkbox"
        className="toggle"
        defaultChecked={lang == "en"}
        aria-label={t("language")}
        onChange={() => {
          setLang(lang == "es" ? "en" : "es");
          const timer: Timer = setTimeout(() => location.reload(), 180);
          return () => clearTimeout(timer);
        }}
      />
      <span>EN</span>
    </div>
  );
}

export default ToggleLangBtn;
