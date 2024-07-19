import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { Book as BookIcon } from "lucide-react";

function CardWithOutDetails(props: Card): Component {
  const { title, formatState, onClick } = props;
  const [state] = useLocalStorage("state", true);

  return (
    <li
      title={title}
      onClick={onClick}
      className="sm:mx-4 hover:scale-95 duration-300 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-col justify-center items-start w-full sm:w-[580px] max-w-[580px] gap-y-1.5 rounded-xl p-4 relative h-14 sm:h-16"
    >
      <div className="flex justify-start items-center gap-x-2 sm:gap-x-4 w-full">
        <BookIcon className="w-5 h-5 sm:w-7 sm:h-7" />
        <p
          title={title}
          className="sm:w-full w-[200px] text-sm sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap bg-gradient-to-r from-[#cdc7ff] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent"
        >
          {title}
        </p>
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
