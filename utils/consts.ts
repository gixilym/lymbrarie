import { DB } from "@/database/initAuth";
import { collection, type CollectionReference } from "firebase/firestore";
import type { Book } from "./types";

const MAINTENANCE: boolean = false;

const BASE_URL: string = "https://lymbrarie.com";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload";

const COLLECTION: CollectionReference = collection(DB, "lymbrarie_books");

const GENDERS: string[] = [
  "no-gender",
  "custom",
  "fiction",
  "non-fiction",
  "religion",
  "mystery",
  "fantasy",
  "romance",
  "horror",
  "thriller",
  "novel",
  "history",
  "biography",
  "self-help",
  "poetry",
  "drama",
  "adventure",
  "psychology",
  "young-adult",
  "children's",
  "philosophy",
  "economy",
  "constabulary",
  "science",
] as const;

const EMPTY_BOOK: Book = {
  id: "",
  data: {
    title: "",
    author: "",
    state: "Pending",
    image: "",
    gender: "no-gender",
    notes: "",
    loaned: "",
    isFav: false,
  },
} as const;

export {
  BASE_URL,
  CLOUDINARY_URL, COLLECTION,
  EMPTY_BOOK,
  GENDERS,
  MAINTENANCE
};

