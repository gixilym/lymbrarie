import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { db } from "@/database/firebase";
import HeaderMain from "@/components/HeaderMain";
import SearchMain from "@/components/SearchMain";
import ListBooks from "@/components/ListBooks";
import HeadPage from "@/components/HeadPage";
import { Session } from "next-auth";
import {
  collection,
  query,
  where,
  getDocs,
  Query,
  QuerySnapshot,
} from "firebase/firestore";

function Home({ session, myBooks }: HomeProps) {
  return (
    <div className="flex flex-col justify-start  items-center w-full h-full">
      <HeadPage />
      <HeaderMain session={session} />
      <SearchMain />
      <ListBooks myBooks={myBooks} />
    </div>
  );
}
export default Home;

interface HomeProps {
  myBooks: object[];
  session: Session | null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const SESSION: Session | null = await getSession(ctx);
  const MY_BOOKS: object[] = await loadListBooks(SESSION);
  return {
    props: {
      session: SESSION?.user,
      myBooks: MY_BOOKS,
    },
  };
}

async function loadListBooks(session: any) {
  const booksArr: object[] = [];
  const user: object[] = session?.user;

  if ("email" in user) {
    const q: Query = query(
      collection(db, "books"),
      where("owner", "==", user.email)
    );
    const resQuery: QuerySnapshot = await getDocs(q);
    resQuery.forEach(doc => booksArr.push(doc.data()));
  }

  return booksArr;
}
