import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/database/firebase";
import HeaderMain from "@/components/HeaderMain";
import SearchMain from "@/components/SearchMain";
import ListBooks from "@/components/ListBooks";
import HeadPage from "@/components/HeadPage";

function Home({ session, myBooks }: HomeProps) {
  return (
    <>
      <HeadPage />
      <HeaderMain session={session} />
      <SearchMain />
      <ListBooks myBooks={myBooks} />
    </>
  );
}
export default Home;

interface HomeProps {
  myBooks: [];
  session: any;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const SESSION = await getSession(ctx);
  const MY_BOOKS: object[] = await loadListBooks(SESSION);
  return {
    props: {
      session: SESSION?.user ?? null,
      myBooks: MY_BOOKS,
    },
  };
}

async function loadListBooks(session: any) {
  const booksArr: object[] = [],
    email = session?.user?.email,
    q = query(collection(db, "books"), where("owner", "==", email)),
    querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => booksArr.push(doc.data()));
  return booksArr;
}
