import type {
  ChangeEvent,
  FormEvent,
  JSX,
  PropsWithChildren,
  RefObject,
  Reference,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextRouter } from "next/router";
import type { Session as NextSession } from "next-auth";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { RecoilState } from "recoil";
import type { AppRouterInstance as RouterNavigation } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { DocumentData } from "firebase/firestore";

type Component = JSX.Element | JSX.Element[] | ReactNode;
type Session = NextSession | null;
type ElementHTML = HTMLElement | null;
type ElementJSX = JSX.Element[];
type InputEvent = ChangeEvent<HTMLInputElement>;
type ElementBody = HTMLBodyElement | null | any;
type FormRef = RefObject<any>;
type Email = string | undefined | null;
type RecoilString = RecoilState<string>;
type DocumentVoid = DocumentData | void;

interface Notes {
  notes: string;
  showNotes: boolean;
  updateNotes: () => void;
  classText: string;
  setNotes: Dispatch<SetStateAction<string>>;
}

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
}

interface AccountInfo {
  allBooks: number;
  reading: number;
  read: number;
  pending: number;
  user: User | null;
}

interface Profile {
  data: {
    user: User;
    allBooks: number;
    reading: number;
    pending: number;
    read: number;
  };
}

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

type Ids =
  | "add_book"
  | "edit_book"
  | "delete_book"
  | "profile"
  | "support"
  | "settings"
  | "thugs"
  | "donations";

export type {
  Ids,
  NextApiRequest,
  NextApiResponse,
  Notes,
  Component,
  PropsWithChildren,
  RouterNavigation,
  Session,
  NextRouter,
  Book,
  ElementHTML,
  ElementJSX,
  InputEvent,
  ElementBody,
  Params,
  FormEvent,
  Reference,
  FormRef,
  Profile,
  AccountInfo,
  User,
  Email,
  RecoilString,
  GetServerSidePropsContext,
  DocumentVoid,
  DocumentData,
  ReactNode,
};
