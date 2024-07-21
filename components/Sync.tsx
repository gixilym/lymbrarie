import useLocalStorage from "@/hooks/useLocalStorage";
import { COLLECTION } from "@/utils/consts";
import type { Component, Doc } from "@/utils/types";
import { isEqual } from "es-toolkit";
import {
  Query,
  QuerySnapshot,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";

function Sync(): Component {
  const [cacheBooks] = useLocalStorage("cacheBooks", null);

  async function syncDocuments(): Promise<void> {
    const q: Query = query(COLLECTION, where("owner", "==", "xd"));
    const res: QuerySnapshot = await getDocs(q);
    const remoteBooks = res.docs;

    const hasChanges: boolean =
      //   (cacheBooks ?? []).length != remoteBooks.length ||
      remoteBooks.every((doc: Doc, i: number) =>
        isEqual(doc.data(), cacheBooks[i].data)
      );

    console.log(hasChanges ? "hay cambios" : "no hay cambios");

    // const s: boolean = isEqual(res.docs[0].data(), cacheBooks[0].data);
    // console.log(s);
  }

  return (
    <button
      onClick={syncDocuments}
      className="bg-blue-400 text-lg rounded-lg text-black px-6 py-2"
    >
      Sincronizar
    </button>
  );
}

export default Sync;
