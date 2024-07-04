import type { Component } from "@/utils/types";
import { MoveDown as DownIcon, MoveUp as UpIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

function ListBooks({ listBooks }: Props): Component {
  function toTop(): void {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function toBottom(): void {
    scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <ul className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-x-hidden h-auto">
        {listBooks}
      </ul>
      <div className="absolute -top-10 lg:top-80 right-20 lg:-right-40 space-y-12">
        <UpIcon
          size={36}
          className={twMerge(
            scrollY > 0 ? "opacity-70" : "opacity-0",
            "fixed cursor-pointer bg-gray-800 py-1 rounded-md w-8"
          )}
          onClick={toTop}
        />
        <DownIcon
          size={36}
          className="fixed cursor-pointer opacity-70 bg-gray-800 py-1 rounded-md w-8"
          onClick={toBottom}
        />
      </div>
    </>
  );
}

export default ListBooks;

interface Props {
  listBooks: Component;
}
