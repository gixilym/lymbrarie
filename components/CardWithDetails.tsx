import type { Component } from "@/utils/types";
import { Tag as GenderIcon, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

function CardWithDetails(props: Card): Component {
  const [t] = useTranslation("global"),
    [state] = useLocalStorage("state", true),
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({ opacity: animations ? 0 : 1 })),
    { title, formatState, img, gender, author, onClick } = props;

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <animated.li
      onClick={onClick}
      style={styles}
      className="mx-4 hover:scale-95 duration-300 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-row justify-start items-start w-full sm:w-[580px] max-w-w-[580px] gap-x-4 rounded-xl relative h-28"
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
      <div className="flex flex-col justify-between items-start gap-y-1 h-full w-[200px] sm:w-[490px] py-1 sm:py-2">
        <p
          title={title}
          className="text-slate-200/85 w-full text-sm sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {title}
        </p>

        <div className="sm:pl-1 w-full space-y-1 sm:space-y-2 text-slate-300/75">
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
    </animated.li>
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
