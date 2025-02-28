import Image from "next/image";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import useTitles from "@/hooks/useTitles";
import { animate, formatTitle } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { CheckIcon, PlusIcon } from "lucide-react";
import { COLLECTION, PAGES } from "@/utils/consts";
import { doc, setDoc } from "firebase/firestore";
import { isNull, union } from "es-toolkit";
import { NextRouter, useRouter } from "next/router";
import { notification } from "@/utils/notifications";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser, withUser } from "next-firebase-auth";
import type { Book, BookData, Component } from "@/utils/types";

export default withUser()(BookCardSearched);

function BookCardSearched(props: Card | any): Component {
  const user = useUser(),
    [t] = useTranslation("global"),
    { title, image, author, notes, gender } = props,
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    [isPressed, setIsPressed] = useState<boolean>(false),
    { startLoading, isLoading, finishLoading } = useLoadContent(),
    { isRepeated } = useTitles(title),
    inLibrary: boolean = isRepeated || isPressed,
    [animations] = useLocalStorage("animations", true),
    [styles, api] = useSpring(() => animate(0, 1, 300)),
    { openPopUp } = usePopUp(),
    { push }: NextRouter = useRouter(),
    data: BookData = {
      ...props,
      title: title.replaceAll(/[_@]/g, "-").slice(0, 80),
      author: author.slice(0, 34),
      gender: gender.slice(0, 24),
    };

  useEffect(() => {
    if (!animations) return;
    api.start(animate(0, 1, 300));
  }, [isLoading]);

  async function addBookToLibrary(): Promise<void> {
    startLoading();
    try {
      const newID: string = crypto.randomUUID();
      await setDoc(doc(COLLECTION, newID), data);
      setIsPressed(true);
      const newVersion: Book[] = union(cacheBooks ?? [], [{ id: newID, data }]);
      setCacheBooks(newVersion);
    } catch (err: any) {
      notification("error", t("err-add-book"));
      console.error(`catch 'addBookToLibrary' ${err.message}`);
    } finally {
      finishLoading();
    }
  }

  function handleClick(): void {
    switch (true) {
      case isNull(user.id):
        openPopUp("login");
        break;

      case inLibrary:
        push(`${PAGES.BOOK}/${formatTitle(title)}`);
        break;

      default:
        addBookToLibrary();
        break;
    }
  }

  return (
    <li
      className="mx-4 bg-slate-900/40 backdrop-blur-sm border border-violet-500/20 
      hover:border-violet-500/30 transition-colors rounded-xl relative h-[200px] md:h-[220px] 
      flex gap-x-6 w-full sm:w-[600px] max-w-[600px] p-6"
    >
      <div className="bg-violet-500/10 p-1.5 rounded-xl h-full">
        <Image
          src={image}
          width={120}
          height={180}
          alt="cover"
          className="w-[120px] h-full aspect-[2/3] rounded-lg select-none object-cover"
        />
      </div>

      <div className="flex flex-col justify-between h-full w-full overflow-hidden">
        <div className="space-y-4">
          <div>
            <p
              title={title}
              className="text-xl font-medium text-slate-200 line-clamp-1 mb-2"
            >
              {title}
            </p>
            <p className="text-[15px] text-slate-300/80">{author}</p>
          </div>

          <p
            title={notes}
            className="text-sm leading-relaxed w-full max-w-[380px] line-clamp-3 text-pretty md:line-clamp-4 text-slate-300/90 pr-2"
          >
            {notes}
          </p>
        </div>

        <animated.div
          style={styles}
          className="flex justify-end absolute bottom-6 right-6"
        >
          {isLoading ? (
            <div className="h-10 w-10 hover:bg-violet-500/30 border-violet-500/20 hover:border-violet-500/30 p-2 rounded-xl bg-violet-500/20 border transition-colors backdrop-blur-sm">
              <span className="loading loading-spinner text-violet-200" />
            </div>
          ) : (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleClick();
              }}
              className={twMerge(
                inLibrary
                  ? "border-green-300 hover:bg-violet-500/30 border--500/20 hover:border-green-300/20 cursor-pointer"
                  : "hover:bg-violet-500/30 border-violet-500/20 hover:border-violet-500/30",
                "h-10 w-10 p-2 rounded-xl bg-violet-900 md:bg-violet-500/20 border transition-colors md:backdrop-blur-sm"
              )}
            >
              {inLibrary ? (
                <CheckIcon className="w-6 h-6 text-green-300" />
              ) : (
                <PlusIcon className="w-6 h-6 text-violet-300" />
              )}
            </button>
          )}
        </animated.div>
      </div>
    </li>
  );
}

interface Card {
  title: string;
  author: string;
  notes: string;
  image: string;
  owner: string;
  gender: string;
  isFav: boolean;
  loaned: string;
}
