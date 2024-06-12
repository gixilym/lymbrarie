import { collectionDB } from "@/utils/store";
import {
  Query,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import type { DocumentData } from "@/utils/types";

async function helperGetBook() {
  const arr: Array<object> = [],
    q: Query<DocumentData> = query(collectionDB, where("title", "==", "")),
    querySnapshot: DocumentData = await getDocs(q);
  querySnapshot.forEach((doc: any) => {
    deleteDoc(doc(collectionDB, doc.id));
  });

  return arr;
  // docData: DocumentData = querySnapshot.docs[0].data(),
  // docId: DocumentData = querySnapshot.docs[0].id,
  // documentsExist: boolean = !querySnapshot.empty;
  //   return documentsExist
  //     ? { data: docData, id: docId }
  //     : console.error("No hay libro con el título: " + bookTitle);
}

export { helperGetBook };
