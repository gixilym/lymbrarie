import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/database/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await addBookToDB(req.body, res);
      break;

    default:
      res.status(200).json({ message: "Método no esperado en /api/books" });
      break;
  }
}

async function addBookToDB(bookData: NextApiRequest, res: NextApiResponse) {
  try {
    await addDoc(collection(db, "books"), bookData);
    res
      .status(201)
      .json({ message: "Datos del libro guardados correctamente" });
  } catch (err: any) {
    res.status(500).json({
      error: `Error al guardar los datos del libro en la db. Error: ${err?.message}`,
    });
  }
}
