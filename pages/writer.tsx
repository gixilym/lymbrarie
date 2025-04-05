import WriterBanner from "@/components/banners/WriterBanner";
import WriterHistory from "@/components/history/WriterHistory";
import { animated, useSpring } from "@react-spring/web";
import { animateOpacity, len } from "@/utils/helpers";
import { COLLECTION_ENTRIES, MAINTENANCE, PAGES } from "@/utils/consts";
import { dismissNoti, notification } from "@/utils/notifications";
import { isNull, noop } from "es-toolkit";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  Query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  ChangeEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BookOpenIcon,
  Maximize2Icon,
  Minimize2Icon,
  SaveIcon,
} from "lucide-react";
import type { Component, Doc, Entry } from "@/utils/types";
import { type User, useUser, withUser } from "next-firebase-auth";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";

export default withUser()(WriterPage);

function WriterPage(): Component {
  const user: User = useUser(),
    auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    [styles] = useSpring(() => animateOpacity(1, 400)),
    [entry, setEntry] = useState<string>(""),
    [title, setTitle] = useState<string>(""),
    [history, setHistory] = useState<Entry[]>([]),
    [editedEntry, setEditedEntry] = useState<Entry | null>(null),
    [isFullscreen, setIsFullscreen] = useState<boolean>(false),
    [showEditMenu, setShowEditMenu] = useState<string | null>(null),
    [isSaving, setIsSaving] = useState<boolean>(false),
    textareaRef: RefObject<HTMLTextAreaElement> = useRef(null),
    containerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (!navigator.onLine) return;
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    (async function () {
      const { entries } = await getEntries(user?.id);
      setHistory(entries);
    })();
  }, [user.id]);

  async function handleSaveEntry(): Promise<void> {
    if (!entry.trim()) return Promise.resolve();

    notification("loading", t("saving"));
    setIsSaving(true);

    if (editedEntry) {
      await setDoc(doc(COLLECTION_ENTRIES, editedEntry.id), {
        ...editedEntry,
        title: title || editedEntry.title,
        content: entry,
        timestamp: createTimestamp(),
      });
      setHistory((prev: Entry[]) =>
        prev.map((i: Entry) =>
          i.id != editedEntry.id
            ? i
            : {
                ...i,
                title: title || i.title,
                content: entry,
                timestamp: createTimestamp(),
              }
        )
      );
      setEditedEntry(null);
    } else {
      const newEntry: Entry = {
        id: crypto.randomUUID(),
        title: title || "Sin título",
        content: entry,
        timestamp: createTimestamp(),
        owner: user?.id,
      };
      await setDoc(doc(COLLECTION_ENTRIES, newEntry.id), newEntry);
      setHistory((prev: Entry[]) => [newEntry, ...prev]);
    }

    dismissNoti(t("saving"));
    notification("success", editedEntry ? "Entry updated!" : "Entry saved!");
    setEntry("");
    setTitle("");
    setIsSaving(false);
  }

  async function handleEditTitle(entry: Entry): Promise<void> {
    const newTitle: string | null = prompt(
      "Ingresa el nuevo título:",
      entry.title
    );

    if (!isNull(newTitle)) {
      try {
        notification("loading", t("saving"));
        await setDoc(doc(COLLECTION_ENTRIES, entry.id), {
          ...entry,
          title: newTitle,
        });
        setHistory((prev: Entry[]) =>
          prev.map(i =>
            i.id === entry.id
              ? { ...i, title: newTitle.trim() || "Sin título" }
              : i
          )
        );
      } catch (err: any) {
        notification("error", "Error actualizando el título");
        console.error(`catch 'handleEditTitle' ${err.message}`);
      } finally {
        dismissNoti();
      }
    }

    setShowEditMenu(null);
  }

  function handleEditContent(entry: Entry): void {
    setEntry(entry.content);
    setTitle(entry.title);
    setEditedEntry(entry);
    setShowEditMenu(null);

    scrollTo({ top: 300, behavior: "smooth" });

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }

  async function handleDeleteEntry(entry: Entry): Promise<void> {
    if (confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      try {
        notification("loading", t("deleting"));
        await deleteDoc(doc(COLLECTION_ENTRIES, entry.id));
        setHistory((prev: Entry[]) =>
          prev.filter((i: Entry) => i.id !== entry.id)
        );
      } catch (err: any) {
        notification("error", "Error eliminando la entrada");
        console.error(`catch 'handleDeleteEntry' ${err.message}`);
      } finally {
        dismissNoti(t("deleting"));
      }
    }
    setShowEditMenu(null);
  }

  function handleCancelEdit(): void {
    setEntry("");
    setTitle("");
    setEditedEntry(null);
  }

  async function toggleFullscreen(): Promise<void> {
    if (!containerRef.current) return Promise.resolve();

    if (isFullscreen) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  }

  return (
    <animated.section
      style={styles}
      className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4 py-8 md:px-8 items-center justify-center flex flex-col"
    >
      <WriterBanner />

      <div
        ref={containerRef}
        className={twMerge(
          "w-full max-w-3xl mt-20 transition-all duration-300",
          isFullscreen && "p-8 bg-white dark:bg-slate-900"
        )}
      >
        {/* Writer Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {editedEntry ? "Editar entrada" : "Nueva entrada"}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
            >
              {isFullscreen ? (
                <Minimize2Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Maximize2Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
            <button
              onClick={() => textareaRef.current?.focus()}
              title="Ir al editor"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpenIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Título de la entrada..."
          className="w-full px-4 py-3 mb-4 text-lg font-medium bg-transparent border rounded-lg border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
        />

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={entry}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setEntry(e.target.value)
            }
            placeholder="Empieza a escribir aquí..."
            className="w-full h-[400px] px-4 py-3 text-base bg-transparent border rounded-lg resize-none border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
          />

          <div className="absolute bottom-3 right-3 text-sm text-slate-400 dark:text-slate-500">
            {len(entry)} caracteres
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          {editedEntry && (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleSaveEntry}
            disabled={!entry.trim() || isSaving}
            className={twMerge(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg transition-all",
              "hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <SaveIcon className="w-4 h-4" />
            {isSaving ? "Guardando..." : editedEntry ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl my-16">
        <WriterHistory
          history={history}
          onEditTitle={handleEditTitle}
          onEditContent={handleEditContent}
          onDeleteEntry={handleDeleteEntry}
          showEditMenu={showEditMenu}
          setShowEditMenu={setShowEditMenu}
        />
      </div>
    </animated.section>
  );
}

async function getEntries(UID: string | null): Promise<List> {
  const entries: any[] = [];
  let isEmpty: boolean = false;

  if (!isNull(UID)) {
    try {
      const q: Query = query(COLLECTION_ENTRIES, where("owner", "==", UID));
      const res: QuerySnapshot = await getDocs(q);
      res.forEach((doc: Doc) => entries.push({ ...doc.data() }));
      isEmpty = res.empty;
    } catch (err: any) {
      if (MAINTENANCE) {
        console.error(`catch 'getEntries' ${err.message}`);
        location.href = PAGES.ERROR;
      }
    }
  }

  return { entries, isEmpty };
}

function createTimestamp(): string {
  const now: Timestamp = Timestamp.now(),
    date: Date = now.toDate(),
    options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: true,
    },
    data: Intl.DateTimeFormat = new Intl.DateTimeFormat("es-AR", options);

  return `${data.format(date)} UTC-3`;
}

type List = { entries: Entry[]; isEmpty: boolean };
