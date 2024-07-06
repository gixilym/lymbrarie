import type { Component } from "@/utils/types";
import { Save as SaveIcon } from "lucide-react";
import { useRouter, type NextRouter } from "next/router";
import {
  ChangeEvent,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { twMerge } from "tailwind-merge";

function NotesBook(props: Notes): Component {
  const [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    [hasChanges, setHasChanges] = useState<boolean>(false),
    { notes, updateNotes, setNotes, classText, isLoading } = props;

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]); // eslint-disable-line

  function handleBeforeUnload(e: BeforeUnloadEvent): string | void {
    if (hasChanges) {
      const msg: string = t("unsaved-changes");
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  }

  function handleChangeContent(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNotes(e.target.value);
    if (!hasChanges) setHasChanges(true);
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
    setHasChanges(false);
    updateNotes();
  }

  return (
    <div className={classText}>
      <div className="flex flex-col items-center justify-between w-full sm:px-0 px-4">
        <div className="flex justify-between items-end w-full h-10">
          {isLoading ? (
            <Skeleton
              width={100}
              height={30}
              baseColor="rgba(33, 30, 33, 0.25)"
              highlightColor="rgba(203, 51, 220, 0.391)"
            />
          ) : (
            <p className="text-2xl opacity-90 select-none">{t("notes")}</p>
          )}

          {hasChanges && (
            <button
              className="btn bg-green-400/80 text-black hover:bg-green-300"
              onClick={saveContent}
            >
              <SaveIcon size={20} />
              {t("save")}
            </button>
          )}
        </div>
      </div>

      <div className="sm:px-0 px-4 h-full flex items-center justify-center w-full ">
        {isLoading ? (
          <div className="flex justify-start items-center w-full">
            <Skeleton
              width={400}
              height={30}
              baseColor="rgba(33, 30, 33, 0.25)"
              highlightColor="rgba(203, 51, 220, 0.391)"
            />
          </div>
        ) : (
          <textarea
            placeholder="..."
            value={notes}
            onChange={handleChangeContent}
            className={twMerge(
              notes?.length > 0 ? "sm:min-h-[300px] max-h-[1200px]" : "h-14",
              "w-full h-full bg-transparent  text-white/80 resize-none border-none focus:ring-0 focus:outline-none text-md sm:text-lg sm:pr-2 py-4"
            )}
          />
        )}
      </div>
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
}
