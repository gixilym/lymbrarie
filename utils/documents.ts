import { isEqual, isNull } from "es-toolkit";
import { Unsubscribe } from "firebase/auth";
import {
  getDocs,
  onSnapshot,
  type Query,
  query,
  type QuerySnapshot,
  where,
} from "firebase/firestore";
import { COLLECTION, MAINTENANCE, PRODUCTION } from "./consts";
import { Book, Doc } from "./types";

async function getDocuments(UID: string): Promise<List> {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (UID) {
    try {
      const q: Query = query(COLLECTION, where("owner", "==", UID));
      const res: QuerySnapshot = await getDocs(q);
      res.forEach((doc: Doc) => books.push({ id: doc.id, data: doc.data() }));
      isEmpty = res.empty;
    } catch (err: any) {
      if (MAINTENANCE) {
        const e = isEqual(err.message, "Quota exceeded.") ? "limit" : "unknown";
        if (PRODUCTION) location.href = `/error?err=${e}`;
        else console.error(`error en getDocuments: ${err.message}`);
      }
    }
  }

  return { books, isEmpty };
}

async function syncDocuments({
  UID,
  cacheBooks,
  setCacheBooks,
  setMyBooks,
  setAllTitles,
  reload,
}: any) {
  if (isNull(UID)) return;

  try {
    console.log("Ejecutando...");
    const myQuery: Query = query(COLLECTION, where("owner", "==", UID));
    const unsubscribe: Unsubscribe = onSnapshot(
      myQuery,
      (qs: QuerySnapshot) => {
        const remoteBooks: Book[] = qs.docs.map((d: Doc) => ({
          id: d?.id,
          data: d?.data(),
        }));

        const localBooks: Book[] = cacheBooks ?? [];
        const hasChanges: boolean =
          localBooks?.length != remoteBooks?.length ||
          remoteBooks?.some(
            (doc, i) => !isEqual(doc.data, localBooks[i]?.data)
          );

        if (hasChanges) {
          setCacheBooks(remoteBooks);
          setMyBooks(remoteBooks);
          setAllTitles(remoteBooks.map(b => b?.data?.title ?? ""));
          reload();
        } else return;
      }
    );

    return unsubscribe;
  } catch (err: any) {
    if (PRODUCTION) return (location.pathname = "/error");
    else console.error(`Error en syncDocuments: ${err.message}`);
  }
}

export { getDocuments, syncDocuments };

interface SyncProps {
  UID: string;
  cacheBooks: Book[] | null;
}

type List = { books: Book[]; isEmpty: boolean };
