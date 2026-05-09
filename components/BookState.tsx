import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { BOOK_STATES } from "@/utils/states";
import type { Component } from "@/utils/types";

function fnState(s: string, d: boolean): Component {
  return <BookStateUI state={s} showDetails={d} />;
}

function BookStateUI({ state, showDetails }: Props): Component {
  function getState(): State {
    const entry = Object.values(BOOK_STATES).find(
      s => s.es === state || s.en.some(e => e === state)
    );
    return entry
      ? { text: entry.es, bg: entry.bg }
      : { text: "", bg: "" };
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

const BookStateMemo = memo(BookStateUI);

export default fnState;
export { BookStateMemo };

interface Props {
  state: string;
  showDetails: boolean;
}

type State = { text: string; bg: string };