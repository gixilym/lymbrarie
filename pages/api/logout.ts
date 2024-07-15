import initAuth from "@/database/initAuth";
import type { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";

initAuth();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") return res.redirect(307, "/");
  try {
    await unsetAuthCookies(req, res);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
  return res.status(200).json({ success: true });
}
