import { Component } from "@/utils/types";
import axios from "axios";
import RECAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

function ReCaptcha(): Component {
  const lang: string = useTranslation().i18n.language;

  //* si el usuario ingresa muchos libros en poco tiempo mostrar captcha.
  
  //! NO MOSTRAR KEY

  function onChange(val: string): void {
    if (val) {
      console.log("CORRECTO");
    } else {
      
      axios.post("/api/recaptcha", {
        data: "ladron-de-gatos",
      });
    }
  }


  return (
    <RECAPTCHA
      size="normal"
      theme="light"
      type="image"
      hl={lang}
      onChange={onChange}
      sitekey="6LcXXw4qAAAAAJ0uMDSV61LcPCWlK0afeGWJ2yMM"
    />
  );
}

export default ReCaptcha;
