import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterIndex from "@/components/FooterIndex";
import HeaderIndex from "@/components/HeaderIndex";
import ListSection from "@/components/ListSection";
import LoadComponent from "@/components/LoadComponent";
import Maintenance from "@/components/Maintenance";
import PopUps from "@/components/PopUps";
import { COLLECTION } from "@/utils/consts";
import { decrypt, encrypt } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { zeroBooksValue } from "@/utils/store";
import type { Book, Component, Doc } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import {
  getDocs,
  Query,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore/lite";
import { AuthAction, type User, useUser, withUser } from "next-firebase-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const maintenance: boolean = JSON.parse(
  process.env.NEXT_PUBLIC_MAINTENANCE as string
);
const production: boolean = JSON.parse(
  process.env.NEXT_PUBLIC_PRODUCTION as string
);

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoadComponent,
})(Index);

function Index(): Component {
  const user: User = useUser(),
    auth: Auth = getAuth(),
    [myBooks, setMyBooks] = useState<Book[]>([]),
    UID: string = user.id as string,
    profileImg: string = user?.photoURL as string,
    profileName: string = user?.displayName as string,
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [, setAllTitles] = useLocalStorage("allTitles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    [animations] = useLocalStorage("animations", true),
    [loading, setLoading] = useState<boolean>(false),
    [zeroBooks] = useRecoilState<boolean>(zeroBooksValue),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 1000 },
    }));

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, () => {});
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    if (zeroBooks) return;
    if (myBooks.length > 0) {
      const encryptTitles: string = encrypt(
        myBooks.map((b: Book) => b.data.title)
      );
      setCacheBooks(encrypt(myBooks));
      setAllTitles(encryptTitles);
    }
  }, [myBooks, user, zeroBooks]);

  useEffect(() => {
    fetchBooks();
  }, [user]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;
    const decryptedBooks: Book[] = decrypt(cacheBooks);
    if (Array.isArray(decryptedBooks)) setMyBooks(decryptedBooks);
    else {
      setLoading(true);
      const { books, isEmpty } = await getListBooks(UID);
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="donde cada libro encuentra su lugar"
        />
      </Head>

      {maintenance ? (
        <Maintenance />
      ) : (
        <>
          <HeaderIndex />
          <PopUps profileImg={profileImg} profileName={profileName} UID={UID} />
          {loading ? (
            <LoadComponent />
          ) : (
            <>
              {booksIsEmpty || zeroBooks ? (
                <AddYourFirstBook />
              ) : (
                <ListSection myBooks={myBooks} />
              )}
            </>
          )}
          <FooterIndex />
        </>
      )}
    </animated.div>
  );
}

async function getListBooks(UID: string): Promise<List> {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (UID) {
    try {
      const q: Query = query(COLLECTION, where("owner", "==", UID));
      const res: QuerySnapshot = await getDocs(q);
      res.forEach((doc: Doc) => books.push({ id: doc.id, data: doc.data() }));
      isEmpty = res.empty;
    } catch (err: any) {
      if (maintenance) {
        const e = err.message == "Quota exceeded." ? "limit" : "unknown";
        if (production) location.href = `/error?err=${e}`;
        else console.error(`error en getListBooks: ${err.message}`);
      }
    }
  }

  return { books, isEmpty };
}

type List = { books: Book[]; isEmpty: boolean };
