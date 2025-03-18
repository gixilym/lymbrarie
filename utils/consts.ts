import { DB } from "@/database/initAuth";
import { collection, type CollectionReference } from "firebase/firestore";
import type { Book, BookData } from "./types";

const MAINTENANCE: boolean = false;

const BASE_URL: string = "https://lymbrarie.com";

const LOCAL_URL: string = "http://localhost:3000";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload";

const COLLECTION: CollectionReference = collection(DB, "lymbrarie_books");

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
  title: "El Rey Serpiente",
  state: "Recommended",
  author: "Jeff Zentver",
  image:
    "https://res.cloudinary.com/dgs55s8qh/image/upload/v1739910195/dn4yymb1zvkduwy5b4v6.jpg",
  gender: "Novela juvenil",
  loaned: "",
  notes:
    "Una novela que relata la conflictiva vida de unos adolescentes que viven en un pequeño pueblo. Una familia religiosa, un padre maltratador, una madre misteriosa y más en este título.",
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
  COLLECTION,
  EMPTY_BOOK,
  GENDERS,
  MAINTENANCE,
  LOCAL_URL,
  BOOK_RECO,
  API_BOOKS,
  PAGES,
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
