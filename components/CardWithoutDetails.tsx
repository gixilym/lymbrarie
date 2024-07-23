import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { Book as Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";

function CardWithOutDetails(props: Card): Component {
  const { title, formatState, onClick } = props;
  const [state] = useLocalStorage("state", true);

  return (
    <li
      onClick={onClick}
      className="sm:mx-4 hover:scale-95 duration-300 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-col justify-center items-start w-full sm:w-[580px] max-w-[580px] gap-y-1.5 rounded-xl p-4 relative h-14 sm:h-16"
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={twMerge(
            state ? "w-10/12" : "w-full",
            "flex justify-start items-center gap-x-2 sm:gap-x-4"
          )}
        >
          <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
          <p className="w-full sm:max-w-max max-w-[300px] text-sm sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap text-slate-200/85">
            {title}
          </p>
        </div>
        {state && formatState()}
      </div>
    </li>
  );
}

export default CardWithOutDetails;

interface Card {
  title: string;
  formatState: () => Component;
  onClick: () => void;
}
