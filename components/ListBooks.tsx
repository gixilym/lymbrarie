import type { Component } from "@/utils/types";
import Arrows from "./Arrows";

function ListBooks({ listBooks }: Props): Component {
  return (
    <>
      <ul className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-x-hidden h-auto">
        {listBooks}
      </ul>
      <Arrows />
    </>
  );
}

export default ListBooks;

interface Props {
  listBooks: Component;
}
