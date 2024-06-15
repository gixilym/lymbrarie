"use client";
import { collection, type CollectionReference } from "firebase/firestore";
import { atom, RecoilState } from "recoil";
import { db } from "@/database/firebase";
import { Book } from "./types";

const inputSearch: RecoilState<string> = atom({
  key: "inputSearch",
  default: "",
});

const stateBookValue: RecoilState<string> = atom({
  key: "stateBookValue",
  default: "",
});

const popupsValue: RecoilState<any> = atom({
  key: "popups",
  default: {
    add_book: false,
    edit_book: false,
    delete_book: false,
    profile: false,
    support: false,
    settings: false,
    thugs: false,
    donations: false,
  },
});

const DEFAULT_COVER: string =
  "https://res.cloudinary.com/dgs55s8qh/image/upload/v1707771560/ycuxmhib7vzjxebqcp5f.jpg";

const BOOK_HANDLER_URL: string = "/api/handler/book";

const NAME_DB: string = "books";

const collectionDB: CollectionReference = collection(db, NAME_DB);

const EMPTY_BOOK: Book = {
  title: "",
  author: "",
  state: "Pending",
  image: "",
  gender: "",
  notes: "",
  loaned: "",
};

export {
  inputSearch,
  stateBookValue,
  DEFAULT_COVER,
  collectionDB,
  BOOK_HANDLER_URL,
  EMPTY_BOOK,
  popupsValue,
};
