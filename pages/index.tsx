import AddYourFirstBook from "@/components/AddYourFirstBook";
import FooterIndex from "@/components/FooterIndex";
import HeaderIndex from "@/components/HeaderIndex";
import ListSection from "@/components/ListSection";
import LoadComponent from "@/components/LoadComponent";
import Maintenance from "@/components/Maintenance";
import PopUps from "@/components/PopUps";
import { COLLECTION, MAINTENANCE, PRODUCTION } from "@/utils/consts";
import { dismissNoti, notification, removeItem } from "@/utils/helpers";
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
import { useTranslation } from "react-i18next";
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
    [t] = useTranslation("global"),
    [myBooks, setMyBooks] = useState<Book[]>([]),
    UID: string = user.id as string,
    profileImg: string = user?.photoURL as string,
    profileName: string = user?.displayName as string,
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [, setAllTitles] = useLocalStorage("allTitles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    [animations] = useLocalStorage("animations", true),
    [loading, setLoading] = useState<boolean>(false),
    [newBookNoti] = useLocalStorage("added", false),
    [deletedNoti] = useLocalStorage("deleted", false),
    [zeroBooks] = useRecoilState<boolean>(zeroBooksValue),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 1000 },
    }));

  useEffect(() => showNotifications(), []);

  function showNotifications(): () => void {
    switch (true) {
      case newBookNoti:
        return () => {
          notification("success", t("book-added"));
          removeItem("added");
        };

      case deletedNoti:
        return () => {
          notification("success", t("book-deleted"));
          removeItem("deleted");
        };

      default:
        return () => {
          removeItem("added");
          removeItem("deleted");
        };
    }
  }

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, () => {});
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  useEffect(() => {
    if (zeroBooks) return;
    if (myBooks.length > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b.data.title));
    }
  }, [myBooks, user, zeroBooks]);

  useEffect(() => {
    fetchBooks();
  }, [user]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;
    const decryptedBooks: Book[] = cacheBooks;
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

      {MAINTENANCE ? (
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
      if (MAINTENANCE) {
        const e = err.message == "Quota exceeded." ? "limit" : "unknown";
        if (PRODUCTION) location.href = `/error?err=${e}`;
        else console.error(`error en getListBooks: ${err.message}`);
      }
    }
  }

  return { books, isEmpty };
}

type List = { books: Book[]; isEmpty: boolean };
