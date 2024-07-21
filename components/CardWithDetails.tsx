import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { Tag as GenderIcon, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function CardWithDetails(props: Card): Component {
  const [t] = useTranslation("global"),
    [state] = useLocalStorage("state", true),
    { title, formatState, img, gender, author, onClick } = props;

  return (
    <li
      onClick={onClick}
      className="mx-4 hover:!scale-95 duration-300 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-row justify-start items-start w-full sm:w-[580px] max-w-[580px] gap-x-4 rounded-xl relative h-[116px]"
    >
      {state && formatState()}
      {img && (
        <Image
          loading="lazy"
          src={img}
          width={60}
          height={100}
          alt="cover"
          className="w-[70px] h-full aspect-[3/5] rounded-tl-lg rounded-bl-lg select-none"
        />
      )}
      <div className="flex flex-col justify-between items-start gap-y-1 h-full w-[300px] sm:w-[490px] py-2 pr-3">
        <p className="text-slate-200/90 w-full text-sm sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </p>

        <div className="sm:pl-1 w-full space-y-1 sm:space-y-2 text-slate-300/80">
          {author && (
            <div className="flex flex-row justify-start items-center gap-x-2">
              <UserIcon size={16} />
              <p className="w-11/12 text-xs sm:text-[16px] capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
                {author}
              </p>
            </div>
          )}
          {gender && gender != "no-gender" && (
            <div className="flex flex-row justify-start items-start gap-x-2">
              <GenderIcon size={15} />
              <p className="w-11/12 text-xs sm:text-[16px] capitalize overflow-ellipsis overflow-hidden whitespace-nowrap pb-1">
                {t(gender)}
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default CardWithDetails;

interface Card {
  title: string;
  formatState: () => Component;
  onClick: () => void;
  img?: string;
  gender?: string;
  author?: string;
}
