import { COLLECTION_BOOKS, MAINTENANCE, PAGES } from "./consts";
import { isEqual, isNull } from "es-toolkit";
import { len } from "./helpers";
import type { Unsubscribe } from "firebase/auth";
import {
  getDocs,
  onSnapshot,
  type Query,
  query,
  type QuerySnapshot,
  where,
} from "firebase/firestore";
import type { Book, Doc, ArgsSync } from "./types";

async function getDocuments(UID: string): Promise<List> {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (UID) {
    try {
      const q: Query = query(COLLECTION_BOOKS, where("owner", "==", UID));
      const res: QuerySnapshot = await getDocs(q);
      res.forEach((doc: Doc) => books.push({ id: doc.id, data: doc.data() }));
      isEmpty = res.empty;
    } catch (err: any) {
      if (MAINTENANCE) {
        console.error(`catch 'getDocuments' ${err.message}`);
        location.href = PAGES.ERROR;
      }
    }
  }

  return { books, isEmpty };
}

async function syncDocuments(props: ArgsSync): Promise<Sync> {
  if (isNull(props.UID)) return;

  try {
    const myQuery: Query = query(
      COLLECTION_BOOKS,
      where("owner", "==", props.UID)
    );
    const unsub: Unsubscribe = onSnapshot(myQuery, (qs: QuerySnapshot) => {
      const remoteBooks: Book[] = qs.docs.map((d: Doc) => ({
          id: d?.id,
          data: d?.data(),
        })),
        localBooks: Book[] = props.cacheBooks ?? [],
        hasChanges: boolean =
          len(localBooks) != len(remoteBooks) ||
          remoteBooks?.some(
            (doc, i) => !isEqual(doc.data, localBooks[i]?.data)
          );

      if (hasChanges) {
        props.setCacheBooks(remoteBooks);
        props.setMyBooks(remoteBooks);
        props.setAllTitles(remoteBooks.map(b => b?.data?.title ?? ""));
      } else return;
    });

    return unsub;
  } catch (err: any) {
    console.error(`catch 'syncDocuments' ${err.message}`);
    return (location.pathname = PAGES.ERROR);
  }
}

export { getDocuments, syncDocuments };

type List = { books: Book[]; isEmpty: boolean };

type Sync = Unsubscribe | void | string;
