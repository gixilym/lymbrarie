import { useTranslation } from "react-i18next";
import { Save as SaveIcon } from "lucide-react";
import {
  ChangeEvent,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type NextRouter, useRouter } from "next/router";

function NotesBook(props: Notes) {
  const { notes, updateNotes, setNotes, classText } = props;
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [t] = useTranslation("global");
  const router: NextRouter = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]); //eslint-disable-line

  function handleBeforeUnload(event: BeforeUnloadEvent): string | void {
    if (hasChanges) {
      const msg: string = t("unsaved-changes");
      event.preventDefault();
      event.returnValue = msg;
      return msg;
    }
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

  function handleChangeContent(event: ChangeEvent<HTMLTextAreaElement>): void {
    setNotes(event.target.value);
    if (!hasChanges) setHasChanges(true);
  }

  return (
    <div className={classText}>
      <div className="flex flex-col items-center justify-between w-full sm:px-0 px-4">
        <div className="flex justify-between items-end w-full h-10">
          <p className="text-2xl opacity-90">{t("notes")}</p>
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

      <div className="sm:px-0 px-4 h-[calc(100dvh-6rem)] bg-slate-950 flex items-center justify-center w-full">
        <textarea
          value={notes}
          onChange={handleChangeContent}
          autoFocus
          className="w-full bg-transparent h-full min-h-[200px] max-h-[1200px] text-white/80 resize-none border-none focus:ring-0 focus:outline-none text-md sm:text-lg sm:pr-2"
        />
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
}
