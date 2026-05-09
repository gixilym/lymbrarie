import { Rabbit, enc } from "crypto-js";
import { isNull } from "es-toolkit";

const key = process.env.DECRYPT as string;

function decrypt(data: unknown): unknown {
  if (isNull(data)) return null;
  const bytes = Rabbit.decrypt(data as string, key);
  const decryptedData: string = bytes.toString(enc.Utf8);
  return JSON.parse(decryptedData);
}

function encrypt(data: unknown): string {
  const stringData: string = JSON.stringify(data);
  return Rabbit.encrypt(stringData, key).toString();
}

export { decrypt, encrypt };
