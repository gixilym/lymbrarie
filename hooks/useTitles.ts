import useLocalStorage from "./useLocalStorage";
import { deburr, isEqual } from "es-toolkit";
import { tLC } from "@/utils/helpers";
import type { Book } from "@/utils/types";

function useTitles(title?: string): Titles {
  const [allTitles, setAllTitles] = useLocalStorage<string[]>("all-titles", []);

  const isRepeated: boolean = allTitles.some((itemTitle: string) => {
    if (!title) return false;
    return isEqual(deburr(tLC(itemTitle)), deburr(tLC(title)));
  });

  function updateTitles(arr: Book[]): void {
    if (!Array.isArray(arr)) return;
    setAllTitles(arr.map((b: Book) => b?.data?.title).filter((t): t is string => !!t));
  }

  return { isRepeated, allTitles, updateTitles };
}

export default useTitles;

interface Titles {
  isRepeated: boolean;
  allTitles: string[];
  updateTitles: (books: Book[]) => void;
}
