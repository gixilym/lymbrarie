import { isEqual } from "es-toolkit";
import type { Translate } from "./types";

function translateStateBook(state: string, t: Translate): string {
  switch (state) {
    case "Read":
      return t("new-book-read");

    case "Reading":
      return t("new-book-reading");

    case "Pending":
      return t("new-book-pending");

    case "Borrowed":
      return t("loanedto");

    default:
      return "";
  }
}

const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const removeItem = (item: string) => localStorage?.removeItem(item);

const clearStorage = (): void => localStorage?.clear();

const isLoaned = (state: string): boolean => isEqual(state, "Borrowed");

const tLC: Format = (val: string): string => val?.toLowerCase().trim();

const formatTitle: Format = (title: string): string =>
  title.replaceAll(" ", "_").replaceAll("?", "@");

const deformatTitle: Format = (title: string): string =>
  title.replaceAll("_", " ").replaceAll("@", "?");

export {
  deformatTitle,
  formatTitle,
  isLoaned,
  normalizeText,
  removeItem,
  tLC,
  translateStateBook,
  clearStorage,
};

type Format = (title: string) => string;
