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
import { Auth, getAuth, Unsubscribe } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  Query,
  QuerySnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { AuthAction, User, useUser, withUser } from "next-firebase-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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
    isLogged: boolean = user != null,
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
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      () => console.log("auth actualizado"),
      err => console.error(`error actualizando auth: ${err.message}`)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    if (zeroBooks) return;
    if (isLogged && myBooks.length > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b.data.title));
    }
  }, [myBooks, user, zeroBooks]);

  useEffect(() => {
    if (isLogged) fetchBooks();
    else setMyBooks(EXAMPLES_BOOKS);
  }, [user]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;
    if (Array.isArray(cacheBooks)) setMyBooks(cacheBooks);
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
          <PopUps profileImg={profileImg} profileName={profileName} UID={UID} />
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

async function getListBooks(UID: string): Promise<List> {
  const books: Book[] = [];
  let isEmpty: boolean = false;

  if (UID) {
    try {
      const q: Query = query(COLLECTION, where("owner", "==", UID));
      const res: QuerySnapshot = await getDocs(q);
      isEmpty = res.empty;
      res.forEach((doc: Doc) => books.push({ id: doc.id, data: doc.data() }));
    } catch (err: any) {
      if (!MAINTENANCE) {
        // const type: string =
        //   err.message == "Quota exceeded." ? "limit" : "unknown";
        // location.href = `/error?err=${type}`;
        console.error(`Error en getListBooks: ${err.message}`);
      }
    }
  }
  return { books, isEmpty };
}

type List = { books: Book[]; isEmpty: boolean };
