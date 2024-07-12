import {
  deleteDoc,
  doc,
  getDocs,
  query,
  Query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { COLLECTION } from "./consts";
import type { Book, Doc } from "./types";

//* ----------- NO USAR EN PRODUCCIÓN -----------

async function DEV_changeOwner(
  currentOwnerID: string,
  newOwnerID: string
): Promise<void> {
  const q: Query = query(COLLECTION, where("owner", "==", currentOwnerID));
  const res: QuerySnapshot = await getDocs(q);

  res.forEach(async (document: Doc) => {
    await setDoc(doc(COLLECTION, document.id), {
      ...document.data(),
      owner: newOwnerID,
    });
  });

  console.info(res);
}

async function DEV_getEveryBooks(): Promise<void> {
  let books: Book[] = [];
  const q: Query = query(COLLECTION, where("data", "==", "lol"));
  const res: QuerySnapshot = await getDocs(q);

  res.forEach((document: Doc) => {
    books.push({ id: document.id, data: document.data() });
  });

  console.info(books);
}

async function DEV_deleteBook(documentID: string): Promise<void> {
  const res: void = await deleteDoc(doc(COLLECTION, documentID));
  console.info(res);
}

export { DEV_changeOwner, DEV_deleteBook, DEV_getEveryBooks };
