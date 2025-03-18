import Link from "next/link";
import usePopUp from "@/hooks/usePopUp";
import { CirclePlusIcon, PlusIcon, SearchIcon } from "lucide-react";
import { PAGES } from "@/utils/consts";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function AddBookBtn({ text }: { text: string }): Component {
  const { openPopUp } = usePopUp();
  const [t] = useTranslation("global");

  function handleManualAdd(): void {
    if (navigator.onLine) openPopUp("add_book");
    else openPopUp("offline");
  }

  return (
    <>
      <div className="dropdown dropdown-bottom hidden sm:block">
        <button
          type="button"
          className="font-normal backdrop-blur-[2px] h-14 last:group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500  border-2 border-violet-300/40 hover:border-violet-300/60 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-5 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 text-violet-200 relative bg-slate-800/60 w-60 justify-start items-center px-3 flex text-lg rounded-xl overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-14 after:h-20 after:content[''] after:bg-violet-400 after:right-10 after:top-3 after:rounded-full after:blur-lg"
        >
          {text}
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 mt-2 w-full
        bg-slate-800/60 backdrop-blur-[2px] border-2 border-violet-300/40
        rounded-2xl text-violet-200 space-y-1 relative overflow-hidden"
        >
          <li>
            <button
              type="button"
              onClick={handleManualAdd}
              className="w-full flex items-center gap-x-3 px-4 py-3 rounded-xl
            hover:bg-violet-500/20 transition-colors text-left relative z-20"
            >
              <CirclePlusIcon size={18} className="text-violet-300" />
              <span>{t("add-manually")}</span>
            </button>
          </li>
          <li>
            <Link
              href={PAGES.SEARCH}
              className="flex items-center gap-x-3 px-4 py-3 rounded-xl
            hover:bg-violet-500/20 transition-colors relative z-20"
            >
              <SearchIcon size={17} className="text-violet-300" />
              <span>{t("search-book")}</span>
            </Link>
          </li>
        </ul>
      </div>
      <button
        type="button"
        onClick={handleManualAdd}
        className="flex sm:hidden rounded-full fixed bottom-28 right-6 border-2 border-violet-400 w-16 h-16 justify-center items-center bg-violet-700 opacity-90 z-20"
      >
        <PlusIcon color="#fff" size={32} />
      </button>
    </>
  );
}

export default AddBookBtn;
