import { useState } from "react";
import { PRODUCTION } from "../consts";

function useLocalStorage(key: any, initialValue?: any) {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
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
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err: any) {
      console.error(PRODUCTION ? "" : err.message);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
