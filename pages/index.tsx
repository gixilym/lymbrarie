import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterMain from "@/components/FooterMain";
import HeaderMain from "@/components/HeaderMain";
import ListBooks from "@/components/ListBooks";
import LoadComponent from "@/components/LoadComponent";
import PopUps from "@/components/PopUps";
import useUserEmail from "@/utils/hooks/useUserEmail";
import { collectionDB } from "@/utils/store";
import type {
  AccountDetails,
  Book,
  Component,
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
import { useEffect, useState } from "react";

function Home({
  accountDetails,
}: {
  accountDetails: AccountDetails;
}): Component {
  const { userEmail } = useUserEmail();
  const [myBooks, setMyBooks] = useState<any>([]);
  const allTitles: string[] = myBooks.map((b: Book) => b.title?.toLowerCase());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null);

  useEffect(() => {
    (async function (): Promise<void> {
      const { booksArr, isEmpty } = await getListBooks(userEmail);
      setMyBooks(booksArr);
      setBooksIsEmpty(isEmpty);
      setIsLoading(false);
    })();
  }, [userEmail]);

  return (
    <div className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-10 sm:gap-y-20">
      <HeaderMain />
      <PopUps allTitles={allTitles} accountDetails={accountDetails} />
      {isLoading && <LoadComponent />}
      {!isLoading && booksIsEmpty && <AddYourFirstBook />}
      {!booksIsEmpty && !isLoading && <ListBooks myBooks={myBooks} />}
      <FooterMain />
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
  const total: number = arr.reduce(function (acc: number, b: Book) {
    return b.state == state ? ++acc : acc;
  }, 0);

  return total;
}

type ResProp = { props: { accountDetails: AccountDetails } };
