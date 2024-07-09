import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterMain from "@/components/FooterMain";
import HeaderMain from "@/components/HeaderMain";
import ListSection from "@/components/ListSection";
import Maintenance from "@/components/Maintenance";
import PopUps from "@/components/PopUps";
import { MAINTENANCE } from "@/utils/consts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { collectionDB } from "@/utils/store";
import type {
  AccountDetails,
  Book,
  Component,
  Doc,
  Email,
  Session,
  User,
} from "@/utils/types";
import {
  Query,
  QuerySnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { GetServerSidePropsContext as Ctx } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

function Index({ accountDetails }: Props): Component {
  const { userEmail } = useUserEmail(),
    [myBooks, setMyBooks] = useState<Book[]>([]),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [, setAllTitles] = useLocalStorage("allTitles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null);

  useEffect(() => {
    if (myBooks.length > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b.data.title));
    }
  }, [myBooks]);

  useEffect(() => {
    fetchBooks();
  }, [userEmail]);

  async function fetchBooks(): Promise<void> {
    if (Array.isArray(cacheBooks)) setMyBooks(cacheBooks);
    else {
      const { books, isEmpty }: ResList = await getListBooks(userEmail);
      setMyBooks(books);
      setBooksIsEmpty(isEmpty);
    }
  }

  return (
    <div className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6">
      <Head>
        <title>Lymbrarie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Donde cada libro encuentra su lugar"
        />
      </Head>
      {MAINTENANCE ? (
        <Maintenance />
      ) : (
        <>
          <HeaderMain />
          <PopUps accountDetails={accountDetails} />
          {booksIsEmpty && <AddYourFirstBook />}
          {!booksIsEmpty && <ListSection myBooks={myBooks} />}
          <FooterMain />
        </>
      )}
    </div>
  );
}
export default Index;

export async function getServerSideProps(ctx: Ctx): Promise<ResProp> {
  const session: Session = await getSession(ctx);
  try {
    const { books } = await getListBooks(session?.user?.email);
    const accountDetails: AccountDetails = loadAccountDetails(books, session);
    return { props: { accountDetails } };
  } catch (err) {
    // @ts-ignore
    return { props: { accountDetails: null } };
  }
}

async function getListBooks(email: Email) {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (email != null) {
    try {
      const q: Query = query(collectionDB, where("owner", "==", email));
      const res: QuerySnapshot = await getDocs(q);
      isEmpty = res.empty;
      res.forEach((doc: Doc) => books.push({ id: doc.id, data: doc.data() }));
    } catch (err: any) {
      if (!MAINTENANCE) {
        const type: string =
          err.message == "Quota exceeded." ? "limit" : "unknown";
        location.href = `/error?err=${type}`;
      }
    }
  }

  return { books, isEmpty };
}

function loadAccountDetails(myBooks: Book[], session: Session): AccountDetails {
  const user: User = session?.user ?? null,
    allBooks: number = myBooks.length,
    reading: number = calculateTotal(myBooks, "Reading"),
    pending: number = calculateTotal(myBooks, "Pending"),
    read: number = calculateTotal(myBooks, "Read"),
    accountDetails: AccountDetails = { user, allBooks, reading, pending, read };

  return accountDetails;
}

function calculateTotal(arr: Book[], state: string): number {
  const total: number = arr.reduce(
    (acc: number, b: Book) => (b.data.state == state ? ++acc : acc),
    0
  );

  return total;
}

interface Props {
  accountDetails: AccountDetails;
}

type ResProp = { props: { accountDetails: AccountDetails } };
type ResList = { books: Book[]; isEmpty: boolean };
