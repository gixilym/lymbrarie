import global_en from "@/translations/en/global.json";
import global_es from "@/translations/es/global.json";
import i18next from "i18next";
import { I18nextProvider as Provider } from "react-i18next";
import type { Component } from "@/utils/types";
import { useEffect, type PropsWithChildren } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: { es: { global: global_es }, en: { global: global_en } },
});

export default function I18Provider({
  children,
}: PropsWithChildren): Component {
  const [lang] = useLocalStorage("language", "es");

  useEffect(() => {
    if (i18next) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return <Provider i18n={i18next}>{children}</Provider>;
}
