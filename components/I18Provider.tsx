import global_en from "@/translations/en/global.json";
import global_es from "@/translations/es/global.json";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import i18next from "i18next";
import { type PropsWithChildren, useEffect } from "react";
import { I18nextProvider as Provider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: { es: { global: global_es }, en: { global: global_en } },
});

function I18Provider({ children }: PropsWithChildren): Component {
  const [lng] = useLocalStorage("language", "en");

  useEffect(() => {
    i18next.changeLanguage(lng);
  }, [lng]);

  return <Provider i18n={i18next}>{children}</Provider>;
}

export default I18Provider;
