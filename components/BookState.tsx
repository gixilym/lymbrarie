import { twMerge } from "tailwind-merge";
import type { Component } from "@/utils/types";

export default function fnState(s: string, d: boolean): Component {
  return <BookState state={s} showDetails={d} />;
}

function BookState({ state, showDetails }: Props): Component {
  function getState(): State {
    switch (state) {
      case "Leyendo":
      case "Reading":
        return { text: "Leyendo", bg: "bg-yellow-600/30" };

      case "Leído":
      case "Read":
        return { text: "Leído", bg: "bg-green-600/30" };

      case "Pendiente":
      case "Pending":
        return { text: "Pendiente", bg: "bg-orange-600/30" };

      case "Prestado":
      case "Lent":
        return { text: "Prestado", bg: "bg-blue-600/30" };

      case "Recomendado":
      case "Recommended":
        return { text: "Recomendado", bg: "bg-violet-600/30" };

      case "Abandonado":
      case "Abandoned":
        return { text: "Abandonado", bg: "bg-red-600/30" };

      case "A medias":
      case "Halfway":
        return { text: "A medias", bg: "bg-gray-600/30" };

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
