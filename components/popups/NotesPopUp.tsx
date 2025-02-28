import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import NotesAlert from "../alerts/NotesAlert";
import useGuest from "@/hooks/useGuest";
import useLoadContent from "@/hooks/useLoadContent";
import usePopUp from "@/hooks/usePopUp";
import { delay, noop } from "es-toolkit";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import {
  CircleX as ExitIcon,
  Notebook as Icon,
  Save as SaveIcon,
} from "lucide-react";
import { type NextRouter, useRouter } from "next/router";
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

function NotesPopUp(props: Props): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    { isGuest } = useGuest(),
    router: NextRouter = useRouter(),
    [hasChanges, setHasChanges] = useState<boolean>(false),
    [showAlert, setShowAlert] = useState<boolean>(false),
    { notes, setNotes, updateNotes, loadingFav } = props,
    [originalNotes, setOriginalNotes] = useState<string>(notes),
    { startLoading, isLoading } = useLoadContent();

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  useEffect(() => {
    if (showAlert) {
      (async function () {
        await delay(5000);
        setShowAlert(false);
      })();
    }
  }, [showAlert]);

  function handleBeforeUnload(e: BeforeUnloadEvent): string | void {
    if (hasChanges && !loadingFav) {
      const msg: string = t("unsaved-changes");
      closePopUp("notes");
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
      const confirmClose: boolean = confirm(t("unsaved-changes"));
      if (!confirmClose) {
        setNotes(originalNotes);
        router.events.emit("routeChangeError");
        throw "Route change aborted";
      } else closePopUp("notes");
    }
  }

  function saveContent(): void {
    if (navigator.onLine) {
      startLoading();
      setHasChanges(false);
      setOriginalNotes(notes);
      updateNotes();
    } else setShowAlert(true);
  }

  function handleClosePopUp(): void {
    if (hasChanges) {
      const confirmClose: boolean = confirm(t("unsaved-changes"));
      if (confirmClose) {
        setHasChanges(false);
        setNotes(originalNotes);
        closePopUp("notes");
      }
    } else closePopUp("notes");
  }

  return (
    <DialogContainer
      id="notes"
      divClass="!max-w-[850px] !h-full !max-h-[93vh] sm:!mt-6 !overflow-y-hidden !bg-slate-800"
    >
      <div className="w-full h-full flex flex-col justify-between items-center gap-y-6 relative">
        <HeaderPopUp icon={<Icon size={27} />} title={t("notes")} />

        {!isGuest && hasChanges && !loadingFav && (
          <button
            onClick={saveContent}
            className="absolute bottom-0 right-0 p-2.5 rounded-xl 
            bg-violet-500/50 border border-violet-500/80 
            hover:bg-violet-500/30 hover:border-violet-500/30 
            transition-colors flex items-center gap-x-2"
          >
            <SaveIcon size={20} className="text-violet-200" />
            <span className="text-white text-sm sm:text-base">{t("save")}</span>
          </button>
        )}

        <textarea
          id="notes"
          value={notes}
          spellCheck={false}
          disabled={loadingFav}
          onChange={isGuest ? noop : handleChangeContent}
          autoFocus
          placeholder="..."
          className="h-full pb-14 pl-3 pr-6 text-sm md:text-lg resize-none 
          border-none focus:ring-0 focus:outline-none w-full bg-transparent 
          text-slate-200 placeholder:text-slate-400/60 text-pretty"
        />

        {isGuest && (
          <p className="w-full text-sm text-slate-300/80 text-center">
            {t("notes-guest")}
          </p>
        )}
      </div>

      {showAlert && <NotesAlert />}

      <button
        disabled={isLoading}
        type="button"
        onClick={handleClosePopUp}
        className="absolute top-4 right-4 p-2 rounded-xl 
        bg-violet-500/20 border border-violet-500/20 
        hover:bg-violet-500/30 hover:border-violet-500/30 
        transition-colors disabled:opacity-50"
      >
        <ExitIcon size={24} className="text-violet-200" />
      </button>
    </DialogContainer>
  );
}

export default NotesPopUp;

interface Props {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  loadingFav: boolean;
  updateNotes: () => void;
}
