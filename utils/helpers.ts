import { isEqual } from "es-toolkit";
import { toast } from "react-hot-toast";

function notification(noti: Notis, msg: string): void {
  toast[noti](msg, {
    id: msg,
    duration: 2000,
    style: {
      backgroundColor: "#202020",
      color: "#fff",
      padding: "6px 20px",
      zIndex: 50,
    },
  });
}

function dismissNoti(id?: string): void {
  return id ? toast.dismiss(id) : toast.dismiss();
}

function translateStateBook(state: string, t: any): string {
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
  notification,
  tLC,
  removeItem,
  translateStateBook,
  dismissNoti,
};

type Format = (title: string) => string;

type Notis = "success" | "error" | "loading";
