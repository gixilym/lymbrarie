import { Rabbit, enc } from "crypto-js";
import { isNull } from "es-toolkit";

const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;

function decrypt(data: any): any {
  if (isNull(data)) return null;
  const bytes: any = Rabbit.decrypt(data, key);
  const decryptedData: string = bytes.toString(enc.Utf8);
  const parseData: any = JSON.parse(decryptedData);
  return parseData;
}

function encrypt(data: any): string {
  const stringData: string = JSON.stringify(data);
  const encryptedData: string = Rabbit.encrypt(stringData, key).toString();
  return encryptedData;
}

export { decrypt, encrypt };
