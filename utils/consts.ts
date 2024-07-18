import { DB } from "@/database/initAuth";
import { collection, type CollectionReference } from "firebase/firestore/lite";
import type { Book, BookData } from "./types";

const MAINTENANCE: boolean = false;

const PRODUCTION: boolean = false;

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

const EXAMPLES_BOOKS: Book[] = [
  {
    id: "first-book-example",
    data: {
      author: "Miguel de Cervantes",
      gender: "Novela",
      notes: "",
      owner: "examples",
      state: "Reading",
      title: "Don Quijote de la Mancha",
      image:
        "https://res.cloudinary.com/dgs55s8qh/image/upload/v1711510484/dvjjtuqhfjqtwh3vcf3p.webp",
    },
  },
  {
    id: "second-book-example",
    data: {
      author: "James Clear",
      gender: "Autoayuda",
      notes: "",
      owner: "examples",
      state: "Pending",
      title: "Hábitos Atómicos",
      image:
        "https://res.cloudinary.com/dgs55s8qh/image/upload/v1712336485/xy0ol84ipqgv6mcwhxph.jpg",
    },
  },
  {
    id: "third-book-example",
    data: {
      author: "Antoine de Saint-Exupéry",
      gender: "Novela",
      notes: "",
      owner: "examples",
      state: "Read",
      title: "El Principito",
      image:
        "https://res.cloudinary.com/dgs55s8qh/image/upload/v1712336807/zr7ysctqsp0ndvpsfrik.jpg",
    },
  },
] as const;

const COLLECTION: CollectionReference = collection(DB, "lymbrarie_books");

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
  COLLECTION,
  EMPTY_BOOK,
  EXAMPLES_BOOKS,
  GENDERS,
  MAINTENANCE,
  PRODUCTION,
};
