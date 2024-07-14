import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import type { Session as NextSession } from "next-auth";
import type {
  ChangeEvent,
  JSX,
  MemoExoticComponent,
  ReactNode,
  RefObject,
} from "react";

type Component = JSX.Element | JSX.Element[] | ReactNode;

type Session = NextSession | null;

type InputEvent = ChangeEvent<HTMLInputElement>;

type FormRef = RefObject<any>;

type Document = DocumentData | void;

type User = UserData | null;

type MemoComponent = MemoExoticComponent<(arg0: any) => Component>;

type SelectEvent = ChangeEvent<HTMLSelectElement>;

type Timer = ReturnType<typeof setTimeout>;

type Doc = QueryDocumentSnapshot<DocumentData, DocumentData>;

type PopUpsIds =
  | "add_book"
  | "edit_book"
  | "delete_book"
  | "profile"
  | "support"
  | "settings"
  | "donations"
  | "offline";

interface Book {
  id: string;
  data: BookData;
}

interface BookData {
  owner?: string;
  title?: string;
  state?: string;
  author?: string;
  image?: string;
  gender?: string;
  loaned?: string;
  notes?: string;
}

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id: string;
}

export type {
  Book,
  BookData,
  Component,
  Doc,
  Document,
  FormRef,
  InputEvent,
  MemoComponent,
  PopUpsIds,
  SelectEvent,
  Session,
  Timer,
  User,
};
