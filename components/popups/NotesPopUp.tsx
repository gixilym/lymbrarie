import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import NotesAlert from "../alerts/NotesAlert";
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
    router: NextRouter = useRouter(),
    [hasChanges, setHasChanges] = useState<boolean>(false),
    [showAlert, setShowAlert] = useState<boolean>(false),
    { notes, setNotes, updateNotes, loadingFav, isGuest } = props,
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
      divClass="!max-w-[850px] !h-full !max-h-[93vh] sm:!mt-6 !overflow-y-hidden"
    >
      <div className="w-full h-full flex flex-col justify-between items-center gap-y-6 relative">
        <HeaderPopUp icon={<Icon size={27} />} title={t("notes")} />
        {!isGuest && hasChanges && !loadingFav && (
          <button
            className="btn bg-green-400 backdrop-blur-sm font-thin text-sm sm:text-lg text-black hover:bg-green-300 opacity-95 absolute bottom-0 right-0"
            onClick={saveContent}
          >
            <SaveIcon size={20} />
            {t("save")}
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
          className="h-full pb-14 pl-2 !pr-8 text-sm md:text-lg resize-none border-none focus:ring-0 focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-gray-200 text-pretty"
        />
        {isGuest && (
          <p className="w-full text-sm text-slate-300 text-center">
            {t("notes-guest")}
          </p>
        )}
      </div>

      {showAlert && <NotesAlert />}

      <button
        disabled={isLoading}
        type="button"
        onClick={handleClosePopUp}
        className="btn btn-ghost btn-square w-12 h-12 rounded-full backdrop-blur-xl absolute top-3.5 right-3"
      >
        <ExitIcon size={38} />
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
  isGuest?: boolean;
}
