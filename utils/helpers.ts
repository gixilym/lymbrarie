import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { isOnlineValue } from "./store";

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

function IsOnline(): void {
  const [isOnline, setIsOnline] = useRecoilState<boolean>(isOnlineValue);

  useEffect(() => console.info("isOnline: " + isOnline), [isOnline]);

  useEffect(() => {
    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    addEventListener("online", handleOnline);
    addEventListener("offline", handleOffline);

    return () => {
      removeEventListener("online", handleOnline);
      removeEventListener("offline", handleOffline);
    };
  }, []);
}

const isLoaned: (state: string) => boolean = (state: string): boolean =>
  state == "Borrowed";

const tLC: Format = (val: string): string => val?.toLowerCase().trim();

const formatTitle: Format = (title: string): string =>
  title.replaceAll(" ", "_").replaceAll("?", "@");

const deformatTitle: Format = (title: string): string =>
  title.replaceAll("_", " ").replaceAll("@", "?");

const userIsOnline: () => void = IsOnline;

export {
  deformatTitle,
  formatTitle,
  isLoaned,
  notification,
  tLC,
  translateStateBook,
  userIsOnline,
};

type Format = (title: string) => string;
