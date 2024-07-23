import usePopUp from "@/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { delay } from "es-toolkit";
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
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import NotesAlert from "../alerts/NotesAlert";
import useLoadContent from "@/hooks/useLoadContent";

function NotesPopUp(props: Props): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
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
      divClass="!max-w-[850px] !h-full !max-h-[93vh] sm:!mt-6 !overflow-y-hidden"
    >
      <div className="w-full h-full flex flex-col justify-between items-center gap-y-6">
        <HeaderPopUp icon={<Icon size={27} />} title={t("notes")} />
        {hasChanges && !loadingFav && (
          <button
            className="btn bg-green-400/90 tracking-tight font-thin text-sm sm:text-lg text-black hover:bg-green-300 opacity-95 absolute top-4 right-3"
            onClick={saveContent}
          >
            <SaveIcon size={20} />
            {t("save")}
          </button>
        )}
        <textarea
          value={notes}
          spellCheck={false}
          disabled={loadingFav}
          onChange={handleChangeContent}
          autoFocus
          placeholder="..."
          className="h-full pb-14 pl-2 !pr-8 text-sm md:text-lg resize-none border-none focus:ring-0 focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-gray-200 text-pretty"
        />
      </div>

      {showAlert && <NotesAlert />}

      <button
        disabled={isLoading}
        type="button"
        onClick={handleClosePopUp}
        className="btn btn-ghost btn-square w-12 h-12 rounded-full backdrop-blur-xl absolute right-3 bottom-2"
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
}
