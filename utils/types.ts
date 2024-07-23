import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type {
  ChangeEvent,
  JSX,
  MemoExoticComponent,
  ReactNode,
  RefObject,
} from "react";
import { type SetterOrUpdater } from "recoil";

type Component = JSX.Element | JSX.Element[] | ReactNode;

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

type PopUpsIds =
  | "add_book"
  | "edit_book"
  | "delete_book"
  | "profile"
  | "support"
  | "settings"
  | "donations"
  | "offline"
  | "updates"
  | "notes"
  | "acceleration";

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
  Translate,
  Document,
  FormRef,
  InputEvent,
  MemoComponent,
  PopUpsIds,
  SelectEvent,
  SetState,
  Timer,
  User,
};
