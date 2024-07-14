import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import { type NextRouter, useRouter } from "next/router";

function AddBookBtn({ text, isLogged }: Props): Component {
  const { openPopUp } = usePopUp(),
    { push, query }: NextRouter = useRouter(),
    ghost: string = JSON.parse((query?.ghost as string) ?? "false");

  function action(): void {
    if (navigator.onLine) {
      isLogged
        ? openPopUp("add_book")
        : push(`/login?book=true&ghost=${ghost}`);
    } else openPopUp("offline");
  }

  return (
    <button
      onClick={action}
      type="button"
      className="btn font-normal backdrop-blur-[2px] h-14 last:group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500  border-2 border-rose-300/40 hover:border-rose-300/60 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-5 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 text-rose-300 relative bg-slate-800/60 w-60 flex justify-start items-center px-3 text-lg rounded-xl overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-14 after:h-20 after:content[''] after:bg-rose-400 after:right-10 after:top-3 after:rounded-full after:blur-lg"
    >
      {text}
    </button>
  );
}

export default AddBookBtn;

interface Props {
  text: string;
  isLogged: boolean;
}
