import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

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

      case "Lent":
        return { text: t("loanedto"), bg: "bg-blue-600/30" };

      case "Recommended":
        return { text: t("new-book-recommended"), bg: "bg-violet-600/30" };

      case "Abandoned":
        return { text: t("abandoned"), bg: "bg-red-600/30" };

      case "Halfway":
        return { text: t("halfway"), bg: "bg-gray-600/30" };

      default:
        return { text: "", bg: "" };
    }
  }

  const { text, bg }: State = getState();

  return (
    <span
      className={twMerge(
        text.includes("Reco") || text.includes("Aban")
          ? "!w-[100px] sm:!w-[125px]"
          : "max-w-[90px]",
        `${bg} text-xs sm:text-sm rounded-md w-3/12 min-w-[75px] py-0.5 text-center select-none opacity-90`,
        showDetails && "absolute bottom-2 right-2 w-24"
      )}
    >
      {text}
    </span>
  );
}

interface Props {
  state: string;
  showDetails: boolean;
}

type State = { text: string; bg: string };
