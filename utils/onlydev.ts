import {
  doc,
  getDocs,
  query,
  Query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { collectionDB } from "./consts";
import type { Book, Doc } from "./types";

//! ----------- NO USAR EN PRODUCCIÓN -----------

async function DEV_changeOwner(
  currentOwnerID: string,
  newOwnerID: string
): Promise<void> {
  const q: Query = query(collectionDB, where("owner", "==", currentOwnerID));
  const res: QuerySnapshot = await getDocs(q);

  res.forEach(async (document: Doc) => {
    await setDoc(doc(collectionDB, document.id), {
      ...document.data(),
      owner: newOwnerID,
    });
  });
}

async function DEV_getEveryBooks(): Promise<void> {
  let books: Book[] = [];
  const q: Query = query(collectionDB, where("data", "==", "lol"));
  const res: QuerySnapshot = await getDocs(q);

  res.forEach((document: Doc) => {
    books.push({ id: document.id, data: document.data() });
  });

  console.log(books);
}

export { DEV_changeOwner, DEV_getEveryBooks };
