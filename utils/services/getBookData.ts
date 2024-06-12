import { collectionDB } from "@/utils/store";
import { Query, getDocs, query, where } from "firebase/firestore";
import type { DocumentData, Email } from "@/utils/types";

async function getBookData(bookTitle: string, user: Email) {
  const q: Query<DocumentData> = query(
      collectionDB,
      where("owner", "==", user),
      where("title", "==", bookTitle)
    ),
    querySnapshot: DocumentData = await getDocs(q),
    docData: DocumentData = querySnapshot.docs[0].data(),
    docId: DocumentData = querySnapshot.docs[0].id,
    documentsExist: boolean = !querySnapshot.empty;

  return documentsExist
    ? { data: docData, id: docId }
    : console.error("No hay libro con el título: " + bookTitle);
}

function translateStateBook(state: string, t: any): string {
  switch (state) {
    case "Read":
      return t("ModalNewBook.state.read");

    case "Reading":
      return t("ModalNewBook.state.reading");

    case "Pending":
      return t("ModalNewBook.state.pending");

    case "Borrowed":
      return t("ModalNewBook.loanedto");

    default:
      return "";
  }
}

export { getBookData, translateStateBook };
