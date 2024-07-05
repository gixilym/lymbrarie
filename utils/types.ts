import type { DocumentData } from "firebase/firestore";
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
  AccountDetails,
  Book,
  Component,
  Document,
  Email,
  FormRef,
  InputEvent,
  MemoComponent,
  PopUpsIds,
  Session,
  GoTo,
  User,
  SelectEvent,
  Timer,
};
