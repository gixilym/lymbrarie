"use client";
import { atom, RecoilState } from "recoil";
import { useState } from "react";

const inputSearch: RecoilState<string> = atom({
  key: "inputSearch",
  default: "",
});

const checkboxValue: RecoilState<string> = atom({
  key: "checkboxValue",
  default: "",
});

// Definición del tipo para el objeto themes
const themes: [{ key: string }, { key: string }] = [
  { key: "sunset" },
  { key: "pastel" },
];

function useLocalStorage(key: any, initialValue?: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err: any) {
      console.error(err.message);
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
      console.error(err.message);
    }
  };
  return [storedValue, setValue];
}

export { inputSearch, checkboxValue, themes, useLocalStorage };
