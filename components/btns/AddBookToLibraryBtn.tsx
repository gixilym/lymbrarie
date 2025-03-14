import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import useTitles from "@/hooks/useTitles";
import { animateOpacity, formatTitle } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { CheckIcon, PlusIcon } from "lucide-react";
import { COLLECTION, PAGES } from "@/utils/consts";
import { doc, setDoc } from "firebase/firestore";
import { isNull, noop, union } from "es-toolkit";
import { NextRouter, useRouter } from "next/router";
import { notification } from "@/utils/notifications";
import { twJoin, twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { type User, useUser, withUser } from "next-firebase-auth";
import type { Book, BookData, Component } from "@/utils/types";

export default withUser()(AddBookToLibraryBtn);

function AddBookToLibraryBtn(props: Props | any): Component {
  const { id }: User = useUser(),
    { data, title, isRecommended } = props,
    [userId, setUserId] = useState<string | null>(id),
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    { openPopUp } = usePopUp(),
    [animations] = useLocalStorage("animations", true),
    [styles, api] = useSpring(() => animateOpacity(1, 300)),
    [isPressed, setIsPressed] = useState<boolean>(false),
    { isRepeated } = useTitles(title),
    inLibrary: boolean = isRepeated || isPressed,
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    { startLoading, isLoading, finishLoading } = useLoadContent();

  useEffect(() => setUserId(id), [id]);

  useEffect(() => {
    if (!animations) return;
    api.start(animateOpacity(1, 300));
  }, [isLoading]);

  async function addBookToLibrary(): Promise<void> {
    startLoading();
    try {
      const newID: string = crypto.randomUUID();
      const newVersion: Book[] = union(cacheBooks ?? [], [{ id: newID, data }]);
      await setDoc(doc(COLLECTION, newID), data);
      setIsPressed(true);
      setCacheBooks(newVersion);
      if (isRecommended) return redirectToBook();
    } catch (err: any) {
      notification("error", t("err-add-book"));
      console.error(`catch 'addBookToLibrary' ${err.message}`);
    } finally {
      finishLoading();
    }
  }

  function handleClick(): void {
    switch (true) {
      case isNull(userId):
        openPopUp("login");
        break;

      case inLibrary:
        redirectToBook();
        break;

      default:
        addBookToLibrary();
        break;
    }
  }

  function redirectToBook(): void {
    router.push(`${PAGES.BOOK}/${formatTitle(title)}`);
  }

  return (
    <animated.div
      style={styles}
      onClick={e => {
        if (isRecommended) {
          e.stopPropagation();
          handleClick();
        } else noop();
      }}
      className={twMerge(
        isRecommended
          ? "btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0"
          : "flex justify-end absolute bottom-6 right-6"
      )}
    >
      {isLoading ? (
        <div
          className={twMerge(
            isRecommended
              ? "pt-1"
              : "h-10 w-10 hover:bg-violet-500/30 border-violet-500/20 hover:border-violet-500/30 p-2 rounded-xl bg-violet-500/20 border transition-colors backdrop-blur-sm text-violet-200"
          )}
        >
          <span className="loading loading-spinner" />
        </div>
      ) : (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
          className={twMerge(
            !isRecommended &&
              twMerge(
                inLibrary
                  ? "border-green-300 hover:bg-violet-500/30 border--500/20 hover:border-green-300/20 cursor-pointer"
                  : "hover:bg-violet-500/30 border-violet-500/20 hover:border-violet-500/30",
                "h-10 w-10 p-2 rounded-xl bg-violet-900 md:bg-violet-500/20 border transition-colors md:backdrop-blur-sm"
              )
          )}
        >
          {inLibrary ? (
            <CheckIcon className="w-6 h-6 text-green-300" />
          ) : (
            <PlusIcon
              className={twJoin("w-6 h-6", !isRecommended && "text-violet-300")}
            />
          )}
        </button>
      )}
    </animated.div>
  );
}

interface Props {
  data: BookData;
  title: string;
  isRecommended?: boolean;
}
