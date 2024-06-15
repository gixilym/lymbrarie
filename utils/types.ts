import type { ChangeEvent, JSX, RefObject, ReactNode } from "react";
import type { Session as NextSession } from "next-auth";
import type { DocumentData } from "firebase/firestore";

type Component = JSX.Element | JSX.Element[] | ReactNode;

type Session = NextSession | null;

type InputEvent = ChangeEvent<HTMLInputElement>;

type FormRef = RefObject<any>;

type Email = string | undefined | null;

type Document = DocumentData | void;

type User = UserData | null;

type PopUpsIds =
  | "add_book"
  | "edit_book"
  | "delete_book"
  | "profile"
  | "support"
  | "settings"
  | "thugs"
  | "donations";

interface Book {
  title?: string;
  author?: string;
  state?: string;
  image?: string;
  pages?: number;
  gender?: string;
  showDetails?: boolean;
  id?: string;
  owner?: string;
  loaned?: string;
  notes?: string;
}

interface AccountDetails {
  allBooks: number;
  reading: number;
  read: number;
  pending: number;
  user: User;
}

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export type {
  PopUpsIds,
  Component,
  Session,
  Book,
  InputEvent,
  FormRef,
  AccountDetails,
  User,
  Email,
  Document,
};
