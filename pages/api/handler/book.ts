import { addDoc, setDoc, doc } from "firebase/firestore";
import { collectionDB } from "@/utils/store";
import type { Book, NextApiRequest, NextApiResponse } from "@/utils/types";

function handlerBook(req: NextApiRequest, res: NextApiResponse) {
  const body: any = req.body;

  switch (req.method) {
    case "POST": {
      const bookData = body;
      addNewBook(bookData);
      break;
    }

    case "PATCH": {
      const { documentId, updatedBook } = body;
      editBook(documentId, updatedBook);
      break;
    }

    case "PUT": {
      const { documentId, data, notes } = body;
      updatedNotesBook(documentId, data, notes);
      break;
    }

    default: {
      res.status(405).json({ message: "Solicitud no permitida" });
      break;
    }
  }

  function addNewBook(data: Book) {
    addDoc(collectionDB, data);
    res.status(200).json({ message: "Documento creado correctamente" });
  }

  function editBook(id: string, data: Book) {
    setDoc(doc(collectionDB, id), data);
    res.status(200).json({ message: "Documento editado correctamente" });
  }

  function updatedNotesBook(id: string, data: Book, notes: string) {
    setDoc(doc(collectionDB, id), { ...data, notes });
    res.status(200).json({ message: "Notas actualizadas correctamente" });
  }

  /*function deleteBook(id: string) {
    deleteDoc(doc(collectionDB, id));
    res.status(200).json({ message: "Documento eliminado correctamente" });
  }*/
}

export default handlerBook;
