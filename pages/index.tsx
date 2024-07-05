import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterMain from "@/components/FooterMain";
import HeaderMain from "@/components/HeaderMain";
import ListSection from "@/components/ListSection";
import LoadComponent from "@/components/LoadComponent";
import Maintenance from "@/components/Maintenance";
import PopUps from "@/components/PopUps";
import { MAINTENANCE } from "@/utils/consts";
import { tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { collectionDB } from "@/utils/store";
import type {
  AccountDetails,
  Book,
  Component,
  Email,
  Session,
  Timer,
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
import { useCallback, useEffect, useMemo, useState } from "react";

function Home({ accountDetails }: Props): Component {
  const { userEmail }: { userEmail: Email } = useUserEmail(),
    [myBooks, setMyBooks] = useState<Book[]>([]),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    allTitles: string[] = useMemo(
      () => myBooks.map((b: Book) => tLC(b.title ?? "")),
      [myBooks]
    );

  //!quitar el loading cuando esta cacheado.
  //! actualizar en el caché se  edita datos/notas 

  useEffect(() => {
    myBooks.length > 0 && setCacheBooks(myBooks);
  }, [myBooks]); // eslint-disable-line

  const fetchBooks: FetchBooks = useCallback(async () => {
    const condition: boolean = Array.isArray(cacheBooks);
    if (condition) {
      console.log("🟢: Cacheados");
      setMyBooks(cacheBooks);
      cleanTimer();
    } else {
      console.log("🔴: Nuevos");
      const { booksArr, isEmpty }: ResList = await getListBooks(userEmail);
      setMyBooks(booksArr);
      setBooksIsEmpty(isEmpty);
      cleanTimer();
    }
  }, [userEmail]); // eslint-disable-line

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  function cleanTimer(): () => void {
    const timer: Timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }

  return (
    <div className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-10 sm:gap-y-20">
      <Head>
        <title>Lymbrarie</title>
      </Head>
      {MAINTENANCE ? (
        <Maintenance />
      ) : (
        <>
          <HeaderMain />
          <PopUps allTitles={allTitles} accountDetails={accountDetails} />
          {isLoading && <LoadComponent />}
          {!isLoading && booksIsEmpty && <AddYourFirstBook />}
          {!booksIsEmpty && !isLoading && <ListSection myBooks={myBooks} />}
          <FooterMain />
        </>
      )}
    </div>
  );
}
export default Home;

export async function getServerSideProps(ctx: Ctx): Promise<ResProp> {
  const session: Session = await getSession(ctx);
  const { booksArr } = await getListBooks(session?.user?.email);
  const accountDetails: AccountDetails = loadAccountDetails(booksArr, session);
  return { props: { accountDetails } };
}

async function getListBooks(email: Email) {
  const booksArr: object[] = [];
  let isEmpty: boolean = false;

  if (email != null) {
    const q: Query = query(collectionDB, where("owner", "==", email));
    const resQuery: QuerySnapshot = await getDocs(q);
    isEmpty = resQuery.empty;
    resQuery.forEach(doc => booksArr.push(doc.data()));
  }

  return { booksArr, isEmpty };
}

function loadAccountDetails(
  myBooks: object[],
  session: Session
): AccountDetails {
  const user: User = session?.user ?? null,
    allBooks: number = myBooks.length,
    reading: number = calculateTotal(myBooks, "Reading"),
    pending: number = calculateTotal(myBooks, "Pending"),
    read: number = calculateTotal(myBooks, "Read"),
    accountDetails: AccountDetails = { user, allBooks, reading, pending, read };

  return accountDetails;
}

function calculateTotal(arr: object[], state: string): number {
  const total: number = arr.reduce(
    (acc: number, b: Book) => (b.state == state ? ++acc : acc),
    0
  );

  return total;
}

interface Props {
  accountDetails: AccountDetails;
}

type ResProp = { props: { accountDetails: AccountDetails } };
type FetchBooks = () => Promise<void>;
type ResList = { booksArr: Book[]; isEmpty: boolean };
