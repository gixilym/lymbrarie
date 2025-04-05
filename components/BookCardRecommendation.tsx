import Cover from "@/public/cover.webp";
import fnState from "./BookState";
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { animateOpacity } from "@/utils/helpers";
import { BOOK_RECO, PAGES } from "@/utils/consts";
import { BookIcon, TagIcon, UserIcon, XIcon } from "lucide-react";
import { notification } from "@/utils/notifications";
import { useTranslation } from "react-i18next";
import { useState, type SyntheticEvent } from "react";
import type { Component } from "@/utils/types";
import { type NextRouter, useRouter } from "next/router";

function BookCardRecommendation({ showDetails }: Props): Component {
  const { push }: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    state = (): Component => fnState("Recommended", true),
    [styles] = useSpring(() => animateOpacity(1, 300)),
    [, setSkipReco] = useLocalStorage(`skip-reco-${BOOK_RECO.title}`, false),
    [localSkip, setLocalSkip] = useState<boolean>(false),
    path: string = `${PAGES.RECOMMENDATION}/${encodeURIComponent(
      BOOK_RECO.title ?? ""
    )}`;

  function handleSkip(e: SyntheticEvent): void {
    e.stopPropagation();
    notification("success", t("skip-reco"));
    setSkipReco(true);
    setLocalSkip(true); //* Estado para ocultar la recomendación sin refrescar la página.
  }

  if (localSkip) return <></>;

  if (showDetails) {
    return (
      <animated.li
        style={styles}
        onClick={() => push(path)}
        className="mx-4 bg-slate-900/40 backdrop-blur-sm border border-l-0 border-violet-500/20 hover:border-violet-500/30 rounded-xl relative h-[130px] flex gap-x-5 w-full sm:w-[600px] max-w-[600px] cursor-pointer hover:scale-[0.98] duration-300"
      >
        {state()}
        <button
          onClick={handleSkip}
          type="button"
          className="absolute top-2 right-2 z-10 bg-slate-900 hover:bg-slate-800 transition-colors p-1 rounded-full"
        >
          <XIcon className="text-slate-200/90 p-[1px]" size={22} />
        </button>
        <div className="bg-violet-500/10 p-1.5 rounded-l-xl h-full">
          <Image
            loading="lazy"
            src={BOOK_RECO.image || Cover.src}
            width={75}
            height={130}
            alt="cover"
            className="w-[75px] h-full aspect-[2/3] rounded-lg select-none object-cover"
          />
        </div>

        <div className="flex flex-col justify-between items-start gap-y-1 h-full w-[300px] sm:w-[490px] py-2 pr-3">
          <div className="flex flex-row justify-start items-center gap-x-2 w-full pl-1">
            <p className="text-slate-200/90 text-sm sm:text-xl font-light overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
              {BOOK_RECO.title}
            </p>
          </div>
          <div className="sm:pl-1 w-full space-y-1 sm:space-y-2 text-slate-300/80">
            <div className="flex flex-row justify-start items-center gap-x-2">
              <div className="bg-violet-500/20 p-[5.3px] rounded-lg">
                <UserIcon size={14} className="text-violet-400" />
              </div>
              <p className="text-sm sm:text-base capitalize line-clamp-1">
                {BOOK_RECO.author}
              </p>
            </div>
            <div className="flex flex-row justify-start items-start gap-x-2">
              <div className="bg-violet-500/20 p-[5.3px] rounded-lg">
                <TagIcon size={14} className="text-violet-400" />
              </div>
              <p className="text-sm sm:text-base capitalize line-clamp-1">
                {BOOK_RECO.gender}
              </p>
            </div>
          </div>
        </div>
      </animated.li>
    );
  }

  return (
    <li
      onClick={() => push(path)}
      className="mx-4 bg-slate-900/40 backdrop-blur-sm border border-violet-500/10 
        hover:border-violet-500/30 rounded-xl relative h-[60px] 
        flex items-center w-full sm:w-[600px] max-w-[600px] cursor-pointer 
        hover:scale-[0.98] duration-300 px-4"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-3 w-full">
          <div className="bg-violet-500/15 p-2 rounded-lg">
            <BookIcon className="w-5.5 h-5.5 text-violet-400" />
          </div>
          <p className="text-base sm:text-lg text-slate-200 font-medium line-clamp-1">
            {BOOK_RECO.title}
          </p>
        </div>
        {state()}
      </div>
    </li>
  );
}

export default BookCardRecommendation;

interface Props {
  showDetails: boolean;
}
