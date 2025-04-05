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

function selectStyles(showAll: boolean, normal: boolean): any {
  return {
    placeholder: (s: StylesConfig<any>) => ({
      ...s,
      // fontSize: "18px",
      textAlign: "center",
      color: normal
        ? "#e2e8f0"
        : showAll
        ? "rgb(203 213 225 / 0.7)"
        : "rgb(203 213 225)",
    }),
    singleValue: (s: StylesConfig) => ({
      ...s,
      // fontSize: "18px",
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
        borderColor: "rgb(196 181 253 / 0.4)",
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
  };
}

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

function pathIs(path: string, options?: PathOptions): boolean {
  const pathname: string = window?.location?.pathname;
  if (options?.exact) return pathname === path;
  return pathname.includes(path);
}

const removeItem: Handler<string, void> = item =>
  window?.localStorage?.removeItem(item);

const clearStorage: Handler<void, void> = () => window?.localStorage?.clear();

const isLent: Handler<string, boolean> = state => isEqual(state, "Lent");

const tLC: Handler<string, string> = val => val?.toLowerCase().trim();

const len: Handler<string | Array<any>, number> = str => str.length;

const animateOpacity = (
  to: number,
  duration: number,
  delay?: number
): AnimateOpacity => ({
  from: { opacity: 0 },
  to: { opacity: to },
  config: { duration: duration },
  delay: delay ?? 0,
});

const animatePopup = (): AnimatePopup => ({
  from: { transform: "scale(0.7)" },
  to: { transform: "scale(1)" },
  config: { duration: 120 },
});

export {
  animateOpacity,
  animatePopup,
  clearStorage,
  formatState,
  isLent,
  len,
  removeItem,
  selectStyles,
  tLC,
  translateStateBook,
  pathIs,
};
interface AnimateOpacity {
  from: { opacity: number };
  to: { opacity: number };
  config: { duration: number };
  delay: number;
}

interface PathOptions {
  exact?: boolean;
}
interface AnimatePopup {
  from: { transform: string };
  to: { transform: string };
  config: { duration: number };
}
