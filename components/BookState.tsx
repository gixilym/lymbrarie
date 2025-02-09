import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export default function fnState(s: string, d: boolean): Component {
  return <BookState state={s} showDetails={d} />;
}

function BookState({ state, showDetails }: Props): Component {
  const [t] = useTranslation("global");

  function getState(): State {
    switch (state) {
      case "Reading":
        return { text: t("new-book-reading"), bg: "bg-yellow-600/30" };

      case "Read":
        return { text: t("new-book-read"), bg: "bg-green-600/30" };

      case "Pending":
        return { text: t("new-book-pending"), bg: "bg-orange-600/30" };

      case "Borrowed":
        return { text: t("loanedto"), bg: "bg-blue-600/30" };

      default:
        return { text: "", bg: "" };
    }
  }

  const { text, bg }: State = getState();

  return (
    <span
      className={twMerge(
        `${bg} rounded-md text-xs sm:text-sm w-3/12 min-w-[75px] max-w-[90px] py-0.5 text-center select-none opacity-90`,
        showDetails && "absolute bottom-2 right-2 w-24"
      )}
    >
      {text.split(" ")[0]}
    </span>
  );
}

interface Props {
  state: string;
  showDetails: boolean;
}

type State = { text: string; bg: string };
