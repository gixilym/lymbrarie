import { toast } from "react-hot-toast";
import { collectionDB } from "@/utils/store";
import type { Document, Email } from "@/utils/types";
import { Query, getDocs, query, where } from "firebase/firestore";

const UNDER_MAINTENANCE: boolean = true;

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

async function getBookData(bookTitle: string, user: Email): Promise<Res> {
  const q: Query<Document> = query(
      collectionDB,
      where("owner", "==", user),
      where("title", "==", bookTitle)
    ),
    querySnapshot: Document = await getDocs(q),
    docData: Document = querySnapshot.docs[0].data(),
    docId: Document = querySnapshot.docs[0].id,
    documentsExist: boolean = !querySnapshot.empty;

  return documentsExist
    ? { data: docData, id: docId }
    : { data: null, id: null };
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

async function ONLY_DEV_getBooks(): Promise<any> {
  const q: Query<Document> = query(collectionDB),
    querySnapshot: Document = await getDocs(q),
    docData: Document = querySnapshot?.docs[0]?.data(),
    docId: Document = querySnapshot?.docs[0]?.id;

  console.log(querySnapshot.docs[1].data());
}

export {
  notification,
  getBookData,
  translateStateBook,
  ONLY_DEV_getBooks,
  UNDER_MAINTENANCE,
};

type Res = { data: Document | null; id: Document | null };
