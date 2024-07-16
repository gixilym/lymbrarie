import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import Arrows from "./btns/ArrowsBtn";

function ListBooks({ listBooks }: Props): Component {
  const [cacheBooks] = useLocalStorage("cacheBooks", null);

  return (
    <ul className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-x-hidden h-auto">
      {listBooks}
      {(cacheBooks ?? []).length > 8 && <Arrows />}
    </ul>
  );
}

export default ListBooks;

interface Props {
  listBooks: Component;
}
