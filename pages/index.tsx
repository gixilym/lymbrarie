import AddYourFirstBook from "@/components/AddYourFirstBook";
import AccelerationAlert from "@/components/alerts/AccelerationAlert";
import ListSection from "@/components/ListSection";
import LoadComponent from "@/components/LoadComponent";
import PopUps from "@/components/PopUps";
import SearchIndex from "@/components/SearchIndex";
import useLocalStorage from "@/hooks/useLocalStorage";
import { zeroAtom } from "@/utils/atoms";
import { getDocuments, syncDocuments } from "@/utils/documents";
import { showNotifications } from "@/utils/notifications";
import type { Book, Component, SyncDocs } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { noop } from "es-toolkit";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { AuthAction, type User, useUser, withUser } from "next-firebase-auth";
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
    [newNoti] = useLocalStorage("added", false),
    [deletedNoti] = useLocalStorage("deleted", false),
    [zeroBooks] = useRecoilState<boolean>(zeroAtom),
    showFirstBook: boolean = booksIsEmpty || zeroBooks,
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    })),
    argsSync: SyncDocs = {
      UID,
      cacheBooks,
      setCacheBooks,
      setMyBooks,
      setAllTitles,
    };

  useEffect(() => {
    showNotifications(newNoti, deletedNoti, t);
    syncDocuments(argsSync);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [user]);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (zeroBooks) return;
    if (myBooks.length > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b?.data?.title ?? ""));
    }
  }, [myBooks, user, zeroBooks]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;
    if (Array.isArray(cacheBooks)) setMyBooks(cacheBooks);
    else {
      setLoading(true);
      const { books, isEmpty } = await getDocuments(UID);
      setMyBooks(books);
      setBooksIsEmpty(isEmpty);
      setLoading(false);
    }
  }

  if (loading) return <LoadComponent mt={false} />;

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <SearchIndex />
      {showFirstBook ? <AddYourFirstBook /> : <ListSection myBooks={myBooks} />}
      <PopUps profileImg={profileImg} profileName={profileName} UID={UID} />
      <AccelerationAlert />
    </animated.main>
  );
}
