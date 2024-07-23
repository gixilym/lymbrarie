import { isEqual } from "es-toolkit";
import toast from "react-hot-toast";
import { removeItem } from "./helpers";
import type { Translate } from "./types";

function notification(noti: Notis, msg: string): void {
  toast[noti](msg, {
    id: msg,
    duration: isEqual(noti, "loading") ? 50000 : 2000,
    style: {
      backgroundColor: "#202020",
      color: "#fff",
      padding: "6px 20px",
      zIndex: 50,
      borderWidth: 1,
      borderColor: "#334155",
    },
  });
}

function showNotifications(
  newBook: boolean,
  deleted: boolean,
  t: Translate
): void {
  switch (true) {
    case newBook: {
      removeItem("added");
      return notification("success", t("book-added"));
    }

    case deleted: {
      removeItem("deleted");
      return notification("success", t("book-deleted"));
    }

    default: {
      removeItem("added");
      removeItem("deleted");
    }
  }
}

function dismissNotification(id?: string): void {
  return id ? toast.dismiss(id) : toast.dismiss();
}

export { dismissNotification, notification, showNotifications };

type Notis = "success" | "error" | "loading";
