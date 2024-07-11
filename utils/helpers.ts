import { toast } from "react-hot-toast";

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

const tLC = (val: string): string => val?.toLowerCase().trim();

const isLoaned = (state: string): boolean => state == "Borrowed";

export { isLoaned, notification, tLC, translateStateBook };
