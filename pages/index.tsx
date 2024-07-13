import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterIndex from "@/components/FooterIndex";
import HeaderIndex from "@/components/HeaderIndex";
import ListSection from "@/components/ListSection";
import LoadComponent from "@/components/LoadComponent";
import Maintenance from "@/components/Maintenance";
import PopUps from "@/components/PopUps";
import { COLLECTION, EXAMPLES_BOOKS, MAINTENANCE } from "@/utils/consts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { zeroBooksValue } from "@/utils/store";
import type { Book, Component, Doc } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import {
  Query,
  QuerySnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult as Result,
} from "next";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import { type NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function Index({ user, isLogged }: Props): Component {
  const [myBooks, setMyBooks] = useState<Book[]>([]),
    userID: string = user?.id,
    profileImg: string = user?.image as string,
    profileName: string = user?.name as string,
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [, setAllTitles] = useLocalStorage("allTitles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    [animations] = useLocalStorage("animations", true),
    [loading, setLoading] = useState<boolean>(false),
    [zeroBooks] = useRecoilState(zeroBooksValue),
    router: NextRouter = useRouter(),
    guest: string = JSON.parse((router.query.guest as string) ?? "false"),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 1000 },
    }));

  useEffect(() => {
    if (isLogged && guest) {
      setAllTitles([]);
      setCacheBooks(null);
      signOut({ callbackUrl: "/login" });
    }
  }, [guest]);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    if (zeroBooks) return;
    if (isLogged && myBooks.length > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b.data.title));
    }
  }, [myBooks, isLogged, zeroBooks]);

  useEffect(() => {
    if (isLogged) fetchBooks();
    else setMyBooks(EXAMPLES_BOOKS);
  }, [isLogged]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;
    if (Array.isArray(cacheBooks)) return setMyBooks(cacheBooks);
    else {
      setLoading(true);
      const { books, isEmpty }: ResList = await getListBooks(userID);
      setMyBooks(books);
      setBooksIsEmpty(isEmpty);
      setLoading(false);
    }
  }

  return (
    <animated.div
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <Head>
        <title>Lymbrarie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="donde cada libro encuentra su lugar"
        />
      </Head>

      {!MAINTENANCE ? (
        <>
          <HeaderIndex isLogged={isLogged} />
          <PopUps
            profileImg={profileImg}
            profileName={profileName}
            userID={userID}
          />
          {loading ? (
            <LoadComponent />
          ) : (
            <>
              {booksIsEmpty || zeroBooks ? (
                <AddYourFirstBook />
              ) : (
                <ListSection myBooks={myBooks} isLogged={isLogged} />
              )}
            </>
          )}
          <FooterIndex isLogged={isLogged} />
        </>
      ) : (
        <Maintenance />
      )}
    </animated.div>
  );
}
export default Index;

export async function getServerSideProps(ctx: Ctx): Promise<Result<SideProps>> {
  const session: any = await getSession(ctx);
  const user: any = { ...session?.user, id: session?.userId ?? null };
  const guest: boolean = JSON.parse((ctx.query.guest as string) ?? "false");

  if (!session && !guest) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { user, isLogged: session != null } };
}

async function getListBooks(userID: string): Promise<ResList> {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (userID) {
    try {
      const q: Query = query(COLLECTION, where("owner", "==", userID));
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

interface Props {
  user: User | any;
  isLogged: boolean;
}

interface Ctx extends GetServerSidePropsContext {
  query: {
    guest?: string;
  };
}

interface User {
  name?: string;
  email?: string;
  image?: string;
  id: string | null;
}

interface SideProps {
  user: User | null;
  isLogged: boolean;
}

type ResList = { books: Book[]; isEmpty: boolean };
