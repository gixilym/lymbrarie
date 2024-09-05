import usePopUp from "@/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { CirclePlus as Icon } from "lucide-react";

function AddBookBtn({ text }: { text: string }): Component {
  const { openPopUp } = usePopUp();

  function action(): void {
    if (navigator.onLine) openPopUp("add_book");
    else openPopUp("offline");
  }

  return (
    <>
      <button
        onClick={action}
        type="button"
        className="font-normal backdrop-blur-[2px] h-14 last:group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500  border-2 border-rose-300/40 hover:border-rose-300/60 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-5 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 text-rose-300 relative bg-slate-800/60 w-60 justify-start items-center px-3 hidden sm:flex text-lg rounded-xl overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-14 after:h-20 after:content[''] after:bg-rose-400 after:right-10 after:top-3 after:rounded-full after:blur-lg"
      >
        {text}
      </button>
      <button
        onClick={action}
        className="block sm:hidden rounded-full fixed bottom-28 right-6 font-normal backdrop-blur-[2px] h-14 last:group after:duration-500 border-2 border-rose-300/40 duration-500 origin-left brightness-110 text-white bg-slate-800/60 w-14 justify-start items-center px-3 text-3xl overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-14 after:h-20 after:content[''] after:bg-rose-400 after:right-10 after:top-3 after:rounded-full after:blur-lg"
      >
        +
      </button>
    </>
  );
}

export default AddBookBtn;
