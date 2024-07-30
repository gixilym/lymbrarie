import { isEqual } from "es-toolkit";
import type { StylesConfig } from "react-select";
import type { Handler, Translate } from "./types";

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

const selectStyles = (showAll: boolean, normal: boolean): any => ({
  placeholder: (s: StylesConfig<any>) => ({
    ...s,
    color: normal
      ? "#e2e8f0"
      : showAll
      ? "rgb(203 213 225 / 0.7)"
      : "rgb(203 213 225)",
  }),
  singleValue: (s: StylesConfig) => ({
    ...s,
    fontSize: "1.05rem",
  }),
  control: (s: StylesConfig) => ({
    ...s,
    padding: "0 0.5rem",
    backgroundColor: normal ? "transparent" : "rgb(30 41 59 / 0.6)",
    borderWidth: normal ? 1 : 2,
    borderColor: normal
      ? "#374151"
      : showAll
      ? "rgb(253 164 175 / 0.1)"
      : "rgb(253 164 175 / 0.42)",
    width: normal ? "100%" : "160px",
    height: normal ? "3rem" : "3.5rem",
    boxShadow: 0,
    borderTopLeftRadius: normal ? "0.8rem" : 0,
    borderBottomLeftRadius: normal ? "0.8rem" : 0,
    borderTopRightRadius: "0.8rem",
    borderBottomRightRadius: "0.8rem",
    ":hover": {
      borderColor: showAll
        ? "rgb(253 164 175 / 0.1)"
        : "rgb(253 164 175 / 0.42)",
    },
  }),
  option: (s: StylesConfig) => ({
    ...s,
    backgroundColor: "transparent",
    border: 0,
    color: "rgb(203 213 225 / 0.9)",
    fontSize: "1rem",
    padding: "5px 10px",
    ":hover": {
      backgroundColor: "rgb(253 164 175 / 0.1)",
    },
  }),
  menu: (s: StylesConfig) => ({
    ...s,
    backgroundColor: "rgb(30 41 59)",
    marginTop: 2,
    borderRadius: "0.8rem",
  }),
  indicatorSeparator: () => ({ backgroundColor: "transparent" }),
});

function formatState(val: string, t: Translate): string {
  switch (val) {
    case "Read":
      return t("add-book-read");

    case "Reading":
      return t("add-book-reading");

    case "Pending":
      return t("add-book-pending");

    case "Borrowed":
      return t("add-book-borrowed");

    default:
      return t("add-book-all");
  }
}

const normalizeText: Handler<string, string> = text =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const removeItem: Handler<string, void> = item =>
  localStorage?.removeItem(item);

const clearStorage: Handler<void, void> = () => localStorage?.clear();

const isLoaned: Handler<string, boolean> = state => isEqual(state, "Borrowed");

const tLC: Handler<string, string> = val => val?.toLowerCase().trim();

const formatTitle: Handler<string, string> = title =>
  title.replaceAll(" ", "_").replaceAll("?", "@");

const deformatTitle: Handler<string, string> = title =>
  title.replaceAll("_", " ").replaceAll("@", "?");

const len: Handler<string | Array<any>, number> = str => str.length;

export {
  clearStorage,
  deformatTitle,
  formatState,
  formatTitle,
  isLoaned,
  len,
  normalizeText,
  removeItem,
  selectStyles,
  tLC,
  translateStateBook,
};
