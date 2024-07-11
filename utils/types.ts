import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
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

type Email = string | undefined | null;

type Document = DocumentData | void;

type User = UserData | null;

type MemoComponent = MemoExoticComponent<(arg0: any) => Component>;

type GoTo = Promise<boolean> | any;

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
  | "donations";

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
  id: string;
}

export type {
  AccountDetails,
  Book,
  Component,
  Document,
  Email,
  Doc,
  FormRef,
  GoTo,
  InputEvent,
  MemoComponent,
  PopUpsIds,
  SelectEvent,
  Session,
  Timer,
  User,
  BookData,
};
