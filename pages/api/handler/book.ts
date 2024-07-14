import { COLLECTION } from "@/utils/consts";
import type { Book } from "@/utils/types";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

async function handlerBook(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = req.body;
  const method: string = req.method ?? "INVALID_REQUEST";

  switch (method) {
    case "POST": {
      const bookData: Book = body;
      await addNewBook(bookData, res);
      break;
    }

    case "PATCH": {
      const { documentId, updatedBook }: BookEdited = body;
      await editBook(documentId, updatedBook, res);
      break;
    }

    case "PUT": {
      const { updatedNotes }: { updatedNotes: Book } = body;
      await updatedNotesBook(updatedNotes, res);
      break;
    }

    case "DELETE": {
      const documentId = body;
      await deleteBook(documentId, res);
      break;
    }

    default: {
      invalidRequest(res);
      break;
    }
  }
}

async function addNewBook(data: Book, res: NextApiResponse): Promise<void> {
  try {
    await addDoc(COLLECTION, data);
    res.status(200).json({ message: "Documento creado correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error al crear el documento", error: err.message });
  }
}

async function editBook(
  id: string,
  data: Book,
  res: NextApiResponse
): Promise<void> {
  try {
    await setDoc(doc(COLLECTION, id), data);
    res.status(200).json({ message: "Documento editado correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error al editar el documento", error: err.message });
  }
}

async function updatedNotesBook(
  book: Book,
  res: NextApiResponse
): Promise<void> {
  try {
    await setDoc(doc(COLLECTION, book.id), book.data);
    res.status(200).json({ message: "Notas actualizadas correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error al actualizar las notas", error: err.message });
  }
}

async function deleteBook(id: string, res: NextApiResponse): Promise<void> {
  try {
    await deleteDoc(doc(COLLECTION, id));
    res.status(200).json({ message: "Documento eliminado correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error al eliminar el documento", error: err.message });
  }
}

function invalidRequest(res: NextApiResponse): void {
  res.setHeader("Allow", ["POST", "PATCH", "PUT", "DELETE"]);
  res.status(405).json({ message: "Método no permitido" });
}

export default handlerBook;

interface BookEdited {
  documentId: string;
  updatedBook: Book;
}
