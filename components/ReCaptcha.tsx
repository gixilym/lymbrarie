import type { Component } from "@/utils/types";
import RECAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

function ReCaptcha(): Component {
  const lang: string = useTranslation().i18n.language;

  //* si el usuario ingresa muchos libros en poco tiempo mostrar captcha.

  function onChange(val: string): void {
    if (val) {
      console.log("pase sin miedo");
    } else {
      console.log("¡Robot!");
    }
  }

  return (
    <RECAPTCHA
      size="normal"
      theme="light"
      type="image"
      hl={lang}
      onChange={onChange}
      sitekey="lol"
    />
  );
}

export default ReCaptcha;
