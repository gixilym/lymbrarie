import { collectionDB } from "@/utils/consts";
import type { Book } from "@/utils/types";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

function handlerBook(req: NextApiRequest, res: NextApiResponse): void {
  const body = req.body;
  const method: string = req.method ?? "INVALID_REQUEST";

  switch (method) {
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
      const { updatedNotes }: { updatedNotes: Book } = body;
      updatedNotesBook(updatedNotes);
      break;
    }

    case "DELETE": {
      const documentId = body;
      deleteBook(documentId);
      break;
    }

    default: {
      invalidRequest();
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

  function updatedNotesBook(book: Book): void {
    setDoc(doc(collectionDB, book.id), book.data);
    res.status(200).json({ message: "Notas actualizadas correctamente" });
  }

  function deleteBook(id: string): void {
    deleteDoc(doc(collectionDB, id));
    res.status(200).json({ message: "Documento eliminado correctamente" });
  }

  function invalidRequest(): void {
    res.status(400).json({ message: "Petición inválida" });
  }
}

export default handlerBook;

interface BookEdited {
  documentId: string;
  updatedBook: Book;
}

interface BookNotes {
  documentId: string;
  book: Book;
}
