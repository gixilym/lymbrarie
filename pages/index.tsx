import FooterMain from "@/components/FooterMain";
import HeaderMain from "@/components/HeaderMain";
import ListBooks from "@/components/ListBooks";
import LoadComponent from "@/components/LoadComponent";
import PopUps from "@/components/PopUps";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useSessionExists from "@/utils/hooks/useSessionExists";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { collectionDB } from "@/utils/store";
import type {
  AccountInfo,
  Book,
  Component,
  Email,
  GetServerSidePropsContext,
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
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Home({ accountInfo }: { accountInfo: AccountInfo }): Component {
  const { userEmail } = useUserEmail(),
    [myBooks, setMyBooks] = useState<any>([]),
    { isLoading, finishLoading, startLoading } = useLoadContent(),
    { userLoggedIn } = useSessionExists(),
    conditon: boolean = isLoading || (myBooks.length == 0 && userLoggedIn),
    allTitles: string[] = myBooks.map((b: Book) => b.title?.toLowerCase());

  useEffect(() => {
    (async function () {
      startLoading();
      const userBooks: object[] = await getListBooks(userEmail);
      setMyBooks(userBooks);
      finishLoading();
    })();
  }, [userEmail]); // eslint-disable-line

  return (
    <div className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-10 sm:gap-y-20">
      <HeaderMain />
      <PopUps allTitles={allTitles} accountInfo={accountInfo} />
      {conditon ? (
        <LoadComponent />
      ) : (
        <ListBooks myBooks={myBooks} accountInfo={accountInfo} />
      )}
      <FooterMain />
    </div>
  );
}
export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const books = await getListBooks(session?.user?.email);
  const accountInfo = loadAccountInfo(books, session);

  return { props: { accountInfo } };
}

async function getListBooks(email: Email) {
  const booksArr: Array<object> = [];

  if (email != null) {
    const q: Query = query(collectionDB, where("owner", "==", email));
    const resQuery: QuerySnapshot = await getDocs(q);
    resQuery.forEach(doc => booksArr.push(doc.data()));
  }

  return booksArr;
}

function loadAccountInfo(myBooks: object[], session: Session) {
  const user: User | null = session?.user ?? null,
    allBooks: number = myBooks.length,
    reading: number = calculateTotal(myBooks, "Reading"),
    pending: number = calculateTotal(myBooks, "Pending"),
    read: number = calculateTotal(myBooks, "Read"),
    accountInfo = { user, allBooks, reading, pending, read };

  return accountInfo;
}

function calculateTotal(arr: object[], state: string) {
  const total: number = arr.reduce(function (acc: number, b: Book) {
    return b.state == state ? ++acc : acc;
  }, 0);

  return total;
}
