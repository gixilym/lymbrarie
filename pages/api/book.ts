import { COLLECTION } from "@/utils/consts";
import {
  getDocs,
  query,
  type Query,
  type QuerySnapshot,
  where,
} from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const q: Query = query(COLLECTION, where("owner", "==", "id-inventad-123"));
    const docs: QuerySnapshot = await getDocs(q);
    console.log(docs);
    return res.status(200).json({ success: true });
  }
}
