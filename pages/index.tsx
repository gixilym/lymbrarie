import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { db } from "@/database/firebase";
import HeaderMain from "@/components/HeaderMain";
import SearchMain from "@/components/SearchMain";
import ListBooks from "@/components/ListBooks";
import HeadPage from "@/components/HeadPage";
import { Session } from "next-auth";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  Query,
  QuerySnapshot,
} from "firebase/firestore";

function Home({ session, myBooks }: HomeProps) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!router.query.theme) {
      router.push({ pathname: "/", query: { theme: "sunset" } }, undefined, {
        shallow: true,
      });
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-start items-center w-[950px] h-full">
      <HeadPage />
      <HeaderMain session={session} />
      <SearchMain />
      <ListBooks myBooks={myBooks} />
    </div>
  );
}
export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const SESSION: Session | null = await getSession(ctx);
  const MY_BOOKS: object[] = await loadListBooks(SESSION);

  return {
    props: {
      session: SESSION?.user ?? null,
      myBooks: MY_BOOKS,
    },
  };
}

async function loadListBooks(session: Session | null) {
  const booksArr: object[] = [];
  const user: UserProps | undefined = session?.user;

  if (user && "email" in user) {
    const q: Query = query(
      collection(db, "books"),
      where("owner", "==", user.email)
    );
    const resQuery: QuerySnapshot = await getDocs(q);
    resQuery.forEach(doc => booksArr.push(doc.data()));
  }

  return booksArr;
}

interface UserProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface HomeProps {
  myBooks: object[];
  session: Session | null;
}
