import useLocalStorage from "./useLocalStorage";
import { deburr, isEqual } from "es-toolkit";
import { tLC } from "@/utils/helpers";

function useTitles(title: string): Titles {
  const [allTitles] = useLocalStorage("all-titles", []);
  const isRepeated: boolean = allTitles.some((itemTitle: string) =>
    isEqual(deburr(tLC(itemTitle)), deburr(tLC(title)))
  );

  return { isRepeated, allTitles };
}

export default useTitles;

interface Titles {
  isRepeated: boolean;
  allTitles: string[];
}
