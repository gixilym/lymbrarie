import CryptoJS from "crypto-js";
import { isNull } from "es-toolkit";

const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;

function decrypt(data: any): any {
  if (isNull(data)) return null;
  const bytes = CryptoJS.Rabbit.decrypt(data, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}

function encrypt(data: any): string {
  const stringData = JSON.stringify(data);
  const encryptedData = CryptoJS.Rabbit.encrypt(stringData, key).toString();
  return encryptedData;
}

export { decrypt, encrypt };
