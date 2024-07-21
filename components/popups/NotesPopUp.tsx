import usePopUp from "@/hooks/usePopUp";
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
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";

function NotesPopUp(props: Props): Component {
  const { openPopUp, closePopUp } = usePopUp(),
    [t] = useTranslation("global"),
    router: NextRouter = useRouter(),
    [hasChanges, setHasChanges] = useState<boolean>(false),
    { notes, setNotes, updateNotes, loadingFav } = props;

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

  function handleClosePopUp(): void {
    if (hasChanges) {
      const confirmClose = confirm(t("unsaved-changes"));
      if (confirmClose) {
        closePopUp("notes");
      }
    } else {
      closePopUp("notes");
    }
  }

  return (
    <DialogContainer
      id="notes"
      divClass="!max-w-[850px] !h-full !max-h-[93vh] sm:!mt-6 !overflow-y-hidden relative"
    >
      <div className="w-full h-full flex flex-col justify-between items-center gap-y-6">
        <HeaderPopUp icon={<Icon size={27} />} title={t("notes")} />
        {hasChanges && !loadingFav && (
          <button
            className="btn bg-green-400/90 tracking-tight font-thin text-sm sm:text-lg text-black hover:bg-green-300 opacity-95 absolute top-3 right-3"
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

      <button
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
