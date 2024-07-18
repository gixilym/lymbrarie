import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { Notebook as NotesIcon, Save as SaveIcon } from "lucide-react";
import { useRouter, type NextRouter } from "next/router";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

function NotesBook(props: Notes): Component {
  const [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    { notes, updateNotes, setNotes, classText, loadingFav } = props,
    [hasChanges, setHasChanges] = useState<boolean>(false),
    [animations] = useLocalStorage("animations", true),
    { openPopUp } = usePopUp(),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 600 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  function handleBeforeUnload(e: BeforeUnloadEvent): string | void {
    if (hasChanges && !loadingFav) {
      const msg: string = t("unsaved-changes");
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  }

  function handleChangeContent(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNotes(e.target.value);
    if (!hasChanges && !loadingFav) setHasChanges(true);
  }

  function handleRouteChange(): void {
    if (hasChanges) {
      const msg: boolean = confirm(t("unsaved-changes"));
      if (!msg) {
        router.events.emit("routeChangeError");
        throw "Route change aborted";
      }
    }
  }

  function saveContent(): void {
    if (navigator.onLine) {
      setHasChanges(false);
      updateNotes();
    } else openPopUp("offline");
  }

  return (
    <div className={classText}>
      <div className="flex flex-col items-center justify-between w-full sm:px-0 px-4">
        <div className="flex justify-between items-end w-full h-10 opacity-80">
          <div className="flex justify-start items-center gap-x-2">
            <NotesIcon size={24} className="opacity-90" />
            <p className="text-xl sm:text-2xl select-none">{t("notes")}</p>
          </div>
          {hasChanges && !loadingFav && (
            <button
              className="btn bg-green-400/90 font-thin text-sm sm:text-lg text-black hover:bg-green-300 opacity-95"
              onClick={saveContent}
            >
              <SaveIcon size={20} />
              {t("save")}
            </button>
          )}
        </div>
      </div>

      <animated.div
        style={styles}
        className="sm:px-0 px-4 h-full flex items-center justify-center w-full "
      >
        <textarea
          placeholder="..."
          value={notes}
          disabled={loadingFav}
          onChange={handleChangeContent}
          className={twMerge(
            notes?.length > 0 ? "sm:min-h-[300px] max-h-[1200px]" : "h-14",
            "w-full h-full bg-transparent  text-white/80 resize-none border-none focus:ring-0 focus:outline-none text-md sm:text-lg sm:pr-2 py-4"
          )}
        />
      </animated.div>
    </div>
  );
}

export default NotesBook;

interface Notes {
  notes: string;
  updateNotes: () => void;
  setNotes: Dispatch<SetStateAction<string>>;
  classText: string;
  isLoading: boolean;
  loadingFav: boolean;
}
