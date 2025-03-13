import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type {
  ChangeEvent,
  Dispatch,
  JSX,
  MemoExoticComponent,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import { SingleValue } from "react-select";
import type { SetterOrUpdater } from "recoil";

type Component = JSX.Element | JSX.Element[] | ReactNode;

type Handler<T, R> = (arg: T) => R;

type EventSelect = SingleValue<any>;

type InputEvent = ChangeEvent<HTMLInputElement>;

type FormRef = RefObject<any>;

type Document = DocumentData | void;

type User = UserData | null;

type MemoComponent = MemoExoticComponent<(arg0: any) => Component>;

type SelectEvent = ChangeEvent<HTMLSelectElement>;

type Timer = ReturnType<typeof setTimeout>;

type Doc = QueryDocumentSnapshot<DocumentData, DocumentData>;

type SetState = SetterOrUpdater<any>;

type Translate = (key: string) => string;

type SelectOpt = { value: string; label: string }[];

type PopUpsIds =
  | "add_book"
  | "edit_book"
  | "delete_book"
  | "offline"
  | "notes"
  | "login"
  | "recommendation";

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
  isFav?: boolean;
  url?: string;
}

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id: string;
}

interface ArgsSync {
  UID: string;
  cacheBooks: Book[] | null;
  setCacheBooks: Dispatch<SetStateAction<Book[] | null>>;
  setMyBooks: Dispatch<SetStateAction<Book[]>>;
  setAllTitles: Dispatch<SetStateAction<string[]>>;
}

interface ShuffleAtom {
  data: BookData[];
  version: string;
  mode: "shuffle" | null;
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
  Handler,
  PopUpsIds,
  SelectEvent,
  SetState,
  ArgsSync,
  Timer,
  Translate,
  SelectOpt,
  User,
  EventSelect,
  ShuffleAtom,
};
