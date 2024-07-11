import { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";

function AddYourFirstBook(): Component {
  const [t] = useTranslation("global");

  return (
    <p className="text-gray-200/70 text-2xl font-public font-normal w-full text-center">
      {t("first-book")}
    </p>
  );
}

export default AddYourFirstBook;
