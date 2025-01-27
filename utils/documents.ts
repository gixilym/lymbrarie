import { COLLECTION, MAINTENANCE } from './consts';
import { isEqual, isNull } from 'es-toolkit';
import { len } from './helpers';
import type { Unsubscribe } from "firebase/auth";
import {
  getDocs,
  onSnapshot,
  type Query,
  query,
  type QuerySnapshot,
  where,
} from "firebase/firestore";
import type { Book, Doc, SyncDocs } from "./types";

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
         location.href = "/error";
         console.error(`catch 'getDocuments' ${err.message}`);
      }
    }
  }

  return { books, isEmpty };
}

async function syncDocuments(props: SyncDocs) {
  const { UID, cacheBooks, setCacheBooks, setMyBooks, setAllTitles } = props;
  if (isNull(UID)) return;
  try {
    const myQuery: Query = query(COLLECTION, where("owner", "==", UID));
    const unsub: Unsubscribe = onSnapshot(myQuery, (qs: QuerySnapshot) => {
      const remoteBooks: Book[] = qs.docs.map((d: Doc) => ({
          id: d?.id,
          data: d?.data(),
        })),
        localBooks: Book[] = cacheBooks ?? [],
        hasChanges: boolean =
          len(localBooks) != len(remoteBooks) ||
          remoteBooks?.some(
            (doc, i) => !isEqual(doc.data, localBooks[i]?.data)
          );

      if (hasChanges) {
        setCacheBooks(remoteBooks);
        setMyBooks(remoteBooks);
        setAllTitles(remoteBooks.map(b => b?.data?.title ?? ""));
      } else return;
    });

    return unsub;
  } catch (err: any) {
    console.error(`catch 'syncDocuments' ${err.message}`);
     return (location.pathname = "/error");
  }
}

export { getDocuments, syncDocuments };

type List = { books: Book[]; isEmpty: boolean };
