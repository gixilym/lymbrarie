"use client";
import { collection, type CollectionReference } from "firebase/firestore";
import { RecoilString } from "./types";
import { atom } from "recoil";
import { db } from "@/database/firebase";

const inputSearch: RecoilString = atom({ key: "inputSearch", default: "" });

const checkboxValue: RecoilString = atom({ key: "checkboxValue", default: "" });

const modalsValue = atom({
  key: "modals",
  default: {
    add_book: false,
    edit_book: false,
    delete_book: false,
    profile: false,
    support: false,
    settings: false,
    matones: false,
    donations: false,
  },
});

const DEFAULT_COVER: string =
  "https://res.cloudinary.com/dgs55s8qh/image/upload/v1707771560/ycuxmhib7vzjxebqcp5f.jpg";

const BOOK_HANDLER_URL: string = "/api/handler/book";

const NAME_DB: string = "books";

const collectionDB: CollectionReference = collection(db, NAME_DB);

const EMPTY_BOOK: object = {
  title: "",
  author: "",
  state: "Pending",
  image: "",
  gender: "",
  notes: "",
  loaned: "",
};

function catchError(msg: string, err: any): void {
  console.error(`${msg}: ${err}`);
}

export {
  inputSearch,
  checkboxValue,
  DEFAULT_COVER,
  collectionDB,
  BOOK_HANDLER_URL,
  EMPTY_BOOK,
  catchError,
  modalsValue,
};
