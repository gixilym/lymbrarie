import { useState } from "react";

function useLocalStorage(key: any, initialValue?: any) {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err: any) {
      const production: boolean = JSON.parse(
        process.env.NEXT_PUBLIC_PRODUCTION as string
      );
      console.error(production ? "" : err.message);
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
      const production: boolean = JSON.parse(
        process.env.NEXT_PUBLIC_PRODUCTION as string
      );
      console.error(production ? "" : err.message);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
