import useLocalStorage from "@/hooks/useLocalStorage";
import { Book as Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { Component } from "@/utils/types";

function CardWithOutDetails(props: Card): Component {
  const { title, formatState, onClick } = props;
  const [state] = useLocalStorage("state", true);

  return (
    <li
      onClick={onClick}
      className="mx-4 bg-slate-900/40 backdrop-blur-sm border border-violet-500/10 
        hover:border-violet-500/30 rounded-xl relative h-[60px] 
        flex items-center w-full sm:w-[600px] max-w-[600px] cursor-pointer 
        hover:scale-[0.98] duration-300 px-4"
    >
      <div className="flex items-center justify-between w-full gap-x-3">
        <div
          className={twMerge(
            state ? "w-9/12" : "w-full",
            "flex items-center gap-x-3"
          )}
        >
          <div className="bg-violet-500/15 p-2 rounded-lg">
            <Icon className="w-5.5 h-5.5 text-violet-400" />
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-medium line-clamp-1">
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
