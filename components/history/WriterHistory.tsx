import { ClockIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { len } from "@/utils/helpers";
import type { Component, Entry } from "@/utils/types";

function WriterHistory(props: Props): Component {
  const {
    history,
    onEditTitle,
    onEditContent,
    onDeleteEntry,
    showEditMenu,
    setShowEditMenu,
  } = props;

  if (len(history) == 0) return <></>;

  return (
    <div className="w-full mt-8">
      <p className="text-xl font-semibold mb-4 flex items-center gap-x-2 text-white">
        <ClockIcon size={24} className="text-violet-200" />
        Mis escritos
      </p>
      <div className="space-y-4">
        {history.map((entry: Entry) => (
          <div
            key={entry.id}
            className="p-4 bg-slate-800/50 rounded-lg border border-violet-500/20 group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-lg mb-1">{entry.title}</h4>
                <p className="text-sm text-slate-400 mb-2">
                  {String(entry.timestamp)}
                </p>
                <p className="text-slate-300 line-clamp-2">{entry.content}</p>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setShowEditMenu(showEditMenu === entry.id ? null : entry.id)
                  }
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <PencilIcon size={18} />
                </button>

                {showEditMenu === entry.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 py-2 bg-slate-800 rounded-lg border border-violet-500/20 shadow-xl z-10">
                    <button
                      onClick={() => onEditTitle(entry)}
                      className="w-full px-4 py-2 text-left hover:bg-slate-700/50 transition-colors"
                    >
                      Editar título
                    </button>
                    <button
                      onClick={() => onEditContent(entry)}
                      className="w-full px-4 py-2 text-left hover:bg-slate-700/50 transition-colors"
                    >
                      Editar contenido
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry)}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700/50 transition-colors"
                    >
                      <span className="flex items-center gap-x-2">
                        <Trash2Icon size={16} />
                        Eliminar
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WriterHistory;

interface Props {
  history: Entry[];
  onEditTitle: (entry: Entry) => void;
  onEditContent: (entry: Entry) => void;
  onDeleteEntry: (entry: Entry) => void;
  showEditMenu: string | null;
  setShowEditMenu: (id: string | null) => void;
}
