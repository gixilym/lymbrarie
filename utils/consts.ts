import { DB } from "@/database/initAuth";
import { collection, type CollectionReference } from "firebase/firestore";
import type { Book, BookData } from "./types";

const MAINTENANCE: boolean = false;

const BASE_URL: string = "https://lymbrarie.com";

const LOCAL_URL: string = "http://localhost:3000";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload";

const COLLECTION_BOOKS: CollectionReference = collection(DB, "lymbrarie_books");

const COLLECTION_ENTRIES: CollectionReference = collection(
  DB,
  "lymbrarie_entries"
);

const API_BOOKS: string = "https://www.googleapis.com/books/v1/volumes";

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

const BOOK_RECO: BookData = {
  owner: "all",
  title: "¡Viven! - La tragedia de los Andes",
  state: "Recommended",
  author: "Piers Paul Read",
  image:
    "https://res.cloudinary.com/dgs55s8qh/image/upload/v1743807173/rtbw9ominfxxqqhljpzc.webp",
  gender: "Historia",
  loaned: "",
  notes:
    "En 1972 un avión que partía desde Montevideo a Santiago de Chile se estrelló en los Andes, en un sitio desolado e inaccesible. Los sobrevivientes, un grupo de jóvenes jugadores de rugby, se enfrentaron a la adversidad y a la muerte para sobrevivir. La historia de su lucha por la vida es un testimonio de la resistencia humana y la fuerza del espíritu.",
  isFav: false,
} as const;

const PAGES: Pages = {
  GUEST: "/guest",
  SEARCH: "/search",
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  CONFIG: "/config",
  FAQ: "/faq",
  TERMSOFUSE: "/termsofuse",
  PRIVACYPOLICY: "/privacypolicy",
  DONATIONS: "/donations",
  BOOK: "/book",
  RECOMMENDATION: "/recommendation",
  ERROR: "/error",
  WRITER: "/writer",
};

export {
  BASE_URL,
  CLOUDINARY_URL,
  COLLECTION_BOOKS,
  EMPTY_BOOK,
  GENDERS,
  MAINTENANCE,
  LOCAL_URL,
  BOOK_RECO,
  API_BOOKS,
  PAGES,
  COLLECTION_ENTRIES,
};

interface Pages {
  GUEST: string;
  SEARCH: string;
  HOME: string;
  LOGIN: string;
  PROFILE: string;
  CONFIG: string;
  FAQ: string;
  TERMSOFUSE: string;
  PRIVACYPOLICY: string;
  DONATIONS: string;
  BOOK: string;
  RECOMMENDATION: string;
  ERROR: string;
  WRITER: string;
}
