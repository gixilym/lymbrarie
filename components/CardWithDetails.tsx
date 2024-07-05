import type { Component } from "@/utils/types";
import { Ampersand as GenderIcon, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

function CardWithDetails(props: Card): Component {
  const [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", "true"),
    [styles, animate] = useSpring(() => ({ opacity: animations ? 0 : 1 })),
    { title, formatState, img, gender, author, onClick } = props;

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate, animations]);

  return (
    <animated.li
      onClick={onClick}
      style={styles}
      className="mx-4 hover:scale-95 duration-300 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-row justify-start items-start w-full sm:w-[580px] gap-x-4 rounded-xl relative h-28"
    >
      {formatState()}
      {img && (
        <Image
          priority
          src={img}
          width={60}
          height={100}
          alt="cover"
          className="w-[70px] h-full aspect-[3/5] rounded-tl-lg rounded-bl-lg select-none"
        />
      )}
      <div className="flex flex-col justify-between items-start gap-y-1 h-full w-[200px] sm:w-[490px] py-2">
        <p
          title={title}
          className="w-full font-public text-lg sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {title}
        </p>

        <div className="pl-1 w-full">
          {author && (
            <div className="flex flex-row justify-start items-center gap-x-2">
              <UserIcon size={16} />
              <p className="capitalize">{author}</p>
            </div>
          )}
          {gender && (
            <div className="flex flex-row justify-start items-center gap-x-2">
              <GenderIcon size={16} />
              <p className="capitalize">{t(gender)}</p>
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
