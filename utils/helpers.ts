import Crypto from "crypto-js";
import { toast } from "react-hot-toast";

function decrypt(data: any): any {
  if (data == null) return null;
  const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;
  const bytes = Crypto.AES.decrypt(data, key);
  const res: any[] = JSON.parse(bytes.toString(Crypto.enc.Utf8));
  return res;
}

function encrypt(data: any): string {
  const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;
  const res: string = Crypto.AES.encrypt(JSON.stringify(data), key).toString();
  return res;
}

function notification(type: "success" | "error", msg: string): void {
  toast[type](msg, {
    duration: 2000,
    style: {
      backgroundColor: "#202020",
      color: "#fff",
      padding: "6px 20px",
      zIndex: 50,
    },
  });
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

function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const isLoaned: (state: string) => boolean = (state: string): boolean =>
  state == "Borrowed";

const tLC: Format = (val: string): string => val?.toLowerCase().trim();

const formatTitle: Format = (title: string): string =>
  title.replaceAll(" ", "_").replaceAll("?", "@");

const deformatTitle: Format = (title: string): string =>
  title.replaceAll("_", " ").replaceAll("@", "?");

export {
  deformatTitle,
  formatTitle,
  isLoaned,
  notification,
  tLC,
  translateStateBook,
  decrypt,
  encrypt,
  normalizeText,
};

type Format = (title: string) => string;
