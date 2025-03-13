import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function AddYourFirstBook(): Component {
  const [t] = useTranslation("global");

  return (
    <p className="text-gray-200/70 text-lg sm:text-2xl font-normal w-full text-center text-emerald-700 mb-24 sm:mb-36">
      {t("first-book")}
    </p>
  );
}

export default AddYourFirstBook;
