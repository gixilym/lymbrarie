import { useTranslation } from "react-i18next";
import { Notes } from "@/utils/types";
import { Save as SaveIcon } from "lucide-react";

function NotesBook(props: Notes) {
  const { notes, showNotes, updateNotes, setNotes, classText } = props;
  const [t] = useTranslation("global");

  return (
    <div className={classText}>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="flex justify-between items-center w-full">
          {(notes?.length > 0 || showNotes) && (
            <p className="text-2xl opacity-80">{t("notes")}</p>
          )}

          {showNotes && (
            <button
              className="btn bg-green-400 text-black hover:bg-green-300"
              onClick={updateNotes}
            >
              <SaveIcon size={20} />
              {t("save")}
            </button>
          )}
        </div>
      </div>

      {showNotes ? (
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="textarea textarea-bordered w-full min-h-[100px] max-h-[400px] text-white"
        />
      ) : (
        <p className="w-full text-start text-white/80">{notes}</p>
      )}
    </div>
  );
}

export default NotesBook;
