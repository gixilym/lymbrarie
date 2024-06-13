import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";

function NoMatchesText(): Component {
  const [t] = useTranslation("global");

  return (
    <p
      id="no-matches"
      className=" text-gray-200/70 text-2xl font-public font-normal w-full text-center mt-8"
    >
      {t("no-matches")}
    </p>
  );
}

export default NoMatchesText;
