import { db } from "@/database/firebase";
import defaultCover from "@/public/cover.webp";
import { collection, type CollectionReference } from "firebase/firestore";
import type { StaticImageData } from "next/image";
import { atom, RecoilState } from "recoil";
import type { BookData } from "./types";

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

const DEFAULT_COVER: StaticImageData | any = defaultCover;

const BOOK_HANDLER_URL: string = "/api/handler/book";

const NAME_DB: string = "books";

const collectionDB: CollectionReference = collection(db, NAME_DB);

const EXAMPLES_BOOKS: string = "examples";

const EmptyData: BookData = {
  title: "",
  author: "",
  state: "Pending",
  image: "",
  gender: "no-gender",
  notes: "",
  loaned: "",
};
const EMPTY_BOOK = {
  id: "",
  data: EmptyData,
};

export {
  BOOK_HANDLER_URL,
  collectionDB,
  DEFAULT_COVER,
  EMPTY_BOOK,
  EXAMPLES_BOOKS,
  inputSearch,
  popupsValue,
  stateBookValue,
};
