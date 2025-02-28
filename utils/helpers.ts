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

    case "Lent":
      return t("loanedto");

    default:
      return "";
  }
}

const selectStyles = (showAll: boolean, normal: boolean): any => ({
  placeholder: (s: StylesConfig<any>) => ({
    ...s,
    fontSize: "0.9rem",
    marginLeft: "1rem",
    color: normal
      ? "#e2e8f0"
      : showAll
      ? "rgb(203 213 225 / 0.7)"
      : "rgb(203 213 225)",
  }),
  singleValue: (s: StylesConfig) => ({
    ...s,
    fontSize: "1rem",
  }),
  control: (s: StylesConfig) => ({
    ...s,
    padding: "0 0.5rem",
    backgroundColor: normal ? "transparent" : "rgb(30 41 59 / 0.6)",
    borderWidth: normal ? 1 : 2,
    borderColor: normal
      ? "rgb(139 92 246 / 0.32)"
      : showAll
      ? "rgb(253 164 175 / 0.1)"
      : "rgb(196 181 253 / 0.4)",
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
        : "rgb(196 181 253 / 0.4)",
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
    marginTop: 4,
    borderRadius: "0.6rem",
    border: "2px solid rgb(253 164 175 / 0.1)",
  }),
  indicatorSeparator: () => ({ backgroundColor: "transparent" }),
});

function formatState(val: string, t: Translate): string {
  switch (val) {
    case "Read":
      return t("new-book-read");

    case "Reading":
      return t("new-book-reading");

    case "Pending":
      return t("new-book-pending");

    case "Lent":
      return t("new-book-lent");

    case "Recommended":
      return t("new-book-recommended");

    default:
      return t("new-book-all");
  }
}

function pathIs(path: string, equal?: boolean): boolean {
  const pathname: string = window?.location?.pathname;
  if (equal) return pathname == path;
  return pathname.includes(path);
}

const removeItem: Handler<string, void> = item =>
  localStorage?.removeItem(item);

const clearStorage: Handler<void, void> = () => localStorage?.clear();

const isLent: Handler<string, boolean> = state => isEqual(state, "Lent");

const tLC: Handler<string, string> = val => val?.toLowerCase().trim();

const formatTitle: Handler<string, string> = title =>
  title.replaceAll(" ", "_").replaceAll("?", "@");

const deformatTitle: Handler<string, string> = title =>
  title.replaceAll("_", " ").replaceAll("@", "?");

const len: Handler<string | Array<any>, number> = str => str.length;

const animate = (
  from: number,
  to: number,
  duration: number,
  delay?: number
): Animate => ({
  from: { opacity: from },
  to: { opacity: to },
  config: { duration: duration },
  delay: delay ?? 0,
});

export {
  animate,
  clearStorage,
  deformatTitle,
  formatState,
  formatTitle,
  isLent,
  len,
  removeItem,
  selectStyles,
  tLC,
  translateStateBook,
  pathIs,
};
interface Animate {
  from: { opacity: number };
  to: { opacity: number };
  config: { duration: number };
  delay: number;
}
