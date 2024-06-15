import { addDoc, setDoc, doc } from "firebase/firestore";
import { collectionDB } from "@/utils/store";
import type { Book } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

function handlerBook(req: NextApiRequest, res: NextApiResponse): void {
  const body = req.body;

  switch (req.method) {
    case "POST": {
      const bookData: Book = body;
      addNewBook(bookData);
      break;
    }

    case "PATCH": {
      const { documentId, updatedBook }: BookEdited = body;
      editBook(documentId, updatedBook);
      break;
    }

    case "PUT": {
      const { documentId, data, notes }: BookNotes = body;
      updatedNotesBook(documentId, data, notes);
      break;
    }

    default: {
      res.status(405).json({ message: "Petición inválida" });
      break;
    }
  }

  function addNewBook(data: Book): void {
    addDoc(collectionDB, data);
    res.status(200).json({ message: "Documento creado correctamente" });
  }

  function editBook(id: string, data: Book): void {
    setDoc(doc(collectionDB, id), data);
    res.status(200).json({ message: "Documento editado correctamente" });
  }

  function updatedNotesBook(id: string, data: Book, notes: string): void {
    setDoc(doc(collectionDB, id), { ...data, notes });
    res.status(200).json({ message: "Notas actualizadas correctamente" });
  }

  /*function deleteBook(id: string) {
    deleteDoc(doc(collectionDB, id));
    res.status(200).json({ message: "Documento eliminado correctamente" });
  }*/
}

export default handlerBook;

interface BookEdited {
  documentId: string;
  updatedBook: Book;
}

interface BookNotes {
  documentId: string;
  notes: string;
  data: Book;
}
