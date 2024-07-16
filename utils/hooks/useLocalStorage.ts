import Crypto from "crypto-js";
import { useState } from "react";
import { PRODUCTION } from "../consts";

function decrypt(data: any): any {
  if (data == null) return null;
  const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;
  const bytes = Crypto.AES.decrypt(data, key);
  const res: any = JSON.parse(bytes.toString(Crypto.enc.Utf8));
  return res;
}

function encrypt(data: any): string {
  const key: string = process.env.NEXT_PUBLIC_DECRYPT as string;
  const res: string = Crypto.AES.encrypt(JSON.stringify(data), key).toString();
  return res;
}

function useLocalStorage(key: any, initialValue?: any) {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? decrypt(item) : initialValue;
    } catch (err: any) {
      console.error(PRODUCTION ? "" : err.message);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, encrypt(valueToStore));
    } catch (err: any) {
      console.error(PRODUCTION ? "" : err.message);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
