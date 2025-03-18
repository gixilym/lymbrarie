import { useRef, useState } from "react";
import {
  BookOpenIcon,
  ClockIcon,
  PencilIcon,
  Maximize2Icon,
  Minimize2Icon,
  Trash2Icon,
  TypeIcon,
  FileEditIcon,
} from "lucide-react";
import type { Component } from "@/utils/types";

function WriterPage(): Component {
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showEditMenu, setShowEditMenu] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaContainerRef = useRef<HTMLDivElement>(null);

  function handleSaveEntry() {
    if (!currentEntry.trim()) return;

    if (editingEntry) {
      // Actualizando entrada existente
      setHistory(prev =>
        prev.map(entry =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                title: currentTitle || entry.title,
                content: currentEntry,
                timestamp: new Date().toLocaleString(),
              }
            : entry
        )
      );
      setEditingEntry(null);
    } else {
      // Creando nueva entrada
      const newEntry: Entry = {
        id: crypto.randomUUID(),
        title: currentTitle || "Sin título",
        content: currentEntry,
        timestamp: new Date().toLocaleString(),
      };
      setHistory(prev => [newEntry, ...prev]);
    }

    setCurrentEntry("");
    setCurrentTitle("");
    alert(
      editingEntry
        ? "¡Entrada actualizada correctamente!"
        : "¡Entrada guardada correctamente!"
    );
  }

  function handleEditTitle(entry: Entry) {
    const newTitle = prompt("Ingresa el nuevo título:", entry.title);
    if (newTitle !== null) {
      setHistory(prev =>
        prev.map(e =>
          e.id === entry.id
            ? { ...e, title: newTitle.trim() || "Sin título" }
            : e
        )
      );
    }
    setShowEditMenu(null);
  }

  function handleEditContent(entry: Entry) {
    setCurrentEntry(entry.content);
    setCurrentTitle(entry.title);
    setEditingEntry(entry);
    setShowEditMenu(null);
  }

  function handleDeleteEntry(entry: Entry) {
    if (confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      setHistory(prev => prev.filter(e => e.id !== entry.id));
    }
    setShowEditMenu(null);
  }

  function handleCancelEdit() {
    setCurrentEntry("");
    setCurrentTitle("");
    setEditingEntry(null);
  }

  async function toggleFullscreen() {
    if (!textareaContainerRef.current) return;

    if (!isFullscreen) {
      try {
        await textareaContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
        setTimeout(() => textareaRef.current?.focus(), 100);
      } catch (err) {
        console.error("Error al entrar en pantalla completa:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error al salir de pantalla completa:", err);
      }
    }
  }

  return (
    <section className="relative max-w-3xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 flex flex-col justify-start items-center gap-6 md:gap-y-12 z-10">
      <div className="w-full flex flex-col items-center gap-y-6 bg-slate-900 rounded-2xl pt-6 backdrop-blur-sm border border-violet-500/20">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-4 pl-6">
            <BookOpenIcon size={34} className="text-violet-300" />
          </div>

          <div className="flex gap-x-3 pr-6">
            {!isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="btn btn-square btn-ghost"
              >
                <Maximize2Icon size={22} />
              </button>
            )}

            <button
              onClick={handleSaveEntry}
              className="flex justify-center items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-400 hover:opacity-85 transition-opacity text-white font-medium"
            >
              <span>{editingEntry ? "Actualizar" : "Guardar"}</span>
            </button>

            {editingEntry && (
              <button
                onClick={handleCancelEdit}
                className="flex justify-center items-center gap-x-2 px-4 py-2 rounded-lg bg-slate-700 hover:opacity-85 transition-opacity text-white font-medium"
              >
                <span>Cancelar</span>
              </button>
            )}
          </div>
        </div>

        <div
          ref={textareaContainerRef}
          className={`relative w-full  ${
            isFullscreen
              ? "!fixed inset-0 bg-transparent flex items-center justify-center p-8"
              : ""
          }`}
        >
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-violet-400 hover:text-violet-300 transition-colors p-2 rounded-lg bg-slate-700/50"
            >
              <Minimize2Icon size={20} />
            </button>
          )}
          <textarea
            ref={textareaRef}
            className={`text-pretty w-full p-6 bg-transparent outline-none resize-none text-slate-50 placeholder-slate-400 ${
              isFullscreen
                ? "h-full text-lg border-0 max-w-[800px] rounded-md"
                : "h-[320px]"
            }`}
            placeholder="¡Hola! Este es un espacio para que puedas escribir lo que desees..."
            value={currentEntry}
            onChange={e => setCurrentEntry(e.target.value)}
          />
        </div>

        {history.length > 0 && (
          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-x-2">
              <ClockIcon size={24} className="text-violet-400" />
              Historial de escritos
            </h3>
            <div className="space-y-4">
              {history.map(entry => (
                <div
                  key={entry.id}
                  className="p-4 bg-slate-800/50 rounded-lg border border-violet-500/20 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-lg mb-1">
                        {entry.title}
                      </h4>
                      <p className="text-sm text-violet-400">
                        {entry.timestamp}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowEditMenu(
                            showEditMenu === entry.id ? null : entry.id
                          )
                        }
                        className="text-violet-400 hover:text-violet-300 transition-colors p-1 rounded-lg opacity-0 group-hover:opacity-100"
                        disabled={!!editingEntry}
                      >
                        <PencilIcon size={16} />
                      </button>
                      {showEditMenu === entry.id && (
                        <div className="absolute right-0 top-8 w-48 py-2 bg-slate-800 rounded-lg shadow-lg border border-violet-500/20 z-10">
                          <button
                            onClick={() => handleEditTitle(entry)}
                            className="w-full px-4 py-2 text-left hover:bg-slate-700/50 flex items-center gap-x-2"
                          >
                            <TypeIcon size={16} />
                            <span>Cambiar título</span>
                          </button>
                          <button
                            onClick={() => handleEditContent(entry)}
                            className="w-full px-4 py-2 text-left hover:bg-slate-700/50 flex items-center gap-x-2"
                          >
                            <FileEditIcon size={16} />
                            <span>Editar contenido</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry)}
                            className="w-full px-4 py-2 text-left hover:bg-red-900/30 text-red-400 flex items-center gap-x-2"
                          >
                            <Trash2Icon size={16} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WriterPage;

interface Entry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}
