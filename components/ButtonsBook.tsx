"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface BtnsProps {
  titleBook: string;
  showNotes: boolean;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  saveNotesInFb: () => Promise<void>;
}
function ButtonsBook(props: BtnsProps) {
  const { titleBook, showNotes, setShowNotes, saveNotesInFb } = props;
  const router = useRouter();

  async function deleteBook() {
    if (confirm("Are you sure you want to delete")) {
      console.log("Eliminando libro con el título: " + titleBook);
    }
  }

  function editBook() {
    router.push(`/book/edit/${titleBook}`);
    return router.refresh();
  }

  function notesFn() {
    setShowNotes(!showNotes);
    saveNotesInFb();
  }

  return (
    <div className="flex items-center justify-end gap-x-4 w-full pb-1.5 pr-2">
      <svg
        onClick={deleteBook}
        className="w-5 h-5"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
      <svg
        onClick={editBook}
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"
        />
      </svg>
      <svg
        onClick={notesFn}
        className="w-4.5 h-5"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
        <path d="M15 3v6h6" />
      </svg>
    </div>
  );
}

export default ButtonsBook;
