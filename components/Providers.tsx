"use client";
import type { Component, PropsWithChildren } from "@/utils/types";
import { RecoilRoot } from "recoil";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "@/utils/translations/es/global.json";
import global_en from "@/utils/translations/en/global.json";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useEffect } from "react";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: { es: { global: global_es }, en: { global: global_en } },
});

function Providers({ children }: PropsWithChildren): Component {
  const [lng] = useLocalStorage("language");

  useEffect(() => {
    i18next.changeLanguage(lng);
  }, [lng]);

  return (
    <I18nextProvider i18n={i18next}>
      <RecoilRoot>{children}</RecoilRoot>
    </I18nextProvider>
  );
}

export default Providers;
