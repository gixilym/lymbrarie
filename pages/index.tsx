"use client";
import AccelerationAlert from "@/components/alerts/AccelerationAlert";
import AddYourFirstBook from "@/components/AddYourFirstBook";
import Bot from "@/components/Bot";
import ListSection from "@/components/ListSection";
import LoaderBook from "@/components/LoaderBook";
import LoaderCircle from "@/components/LoaderCircle";
import PopUps from "@/components/PopUps";
import SearchIndex from "@/components/SearchIndex";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { getDocuments, syncDocuments } from "@/utils/documents";
import { len } from "@/utils/helpers";
import { noop } from "es-toolkit";
import { referrerAtom, zeroAtom } from "@/utils/atoms";
import { showNotifications } from "@/utils/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Book, Component, SyncDocs } from "@/utils/types";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { AuthAction, type User, useUser, withUser } from "next-firebase-auth";

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoaderCircle,
})(Index);

function Index(): Component {
  const user: User = useUser(),
    auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    [myBooks, setMyBooks] = useState<Book[]>([]),
    UID: string = user.id as string,
    profileImg: string = user?.photoURL as string,
    profileName: string = user?.displayName as string,
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    [, setAllTitles] = useLocalStorage("all-titles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    [animations] = useLocalStorage("animations", true),
    [loading, setLoading] = useState<boolean>(false),
    [newNoti] = useLocalStorage("added", false),
    [deletedNoti] = useLocalStorage("deleted", false),
    [zeroBooks] = useRecoilState<boolean>(zeroAtom),
    [referrerBookPath] = useRecoilState<boolean>(referrerAtom),
    showFirstBook: boolean = booksIsEmpty || zeroBooks,
    [styles, api] = useSpring(() => ({
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
    if (!navigator.onLine) return;
    syncDocuments(argsSync);
  }, []);

  useEffect(() => animateList(), [myBooks]);

  useEffect(() => {
    fetchBooks();
  }, [user]);

  useEffect(() => {
    if (!navigator.onLine) return;
    const unsub: Unsubscribe = onAuthStateChanged(auth, () => noop());
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (zeroBooks) return;
    if (len(myBooks) > 0) {
      setCacheBooks(myBooks);
      setAllTitles(myBooks.map((b: Book) => b?.data?.title ?? ""));
    }
  }, [myBooks, user, zeroBooks]);

  async function fetchBooks(): Promise<void> {
    if (zeroBooks) return;

    if (Array.isArray(cacheBooks) || !navigator.onLine)
      return setMyBooks(cacheBooks ?? []);

    setLoading(true);
    const { books, isEmpty } = await getDocuments(UID);
    setMyBooks(books);
    setBooksIsEmpty(isEmpty);
    setCacheBooks(books);
    setAllTitles(books.map((b: Book) => b?.data?.title ?? ""));
    setLoading(false);
  }

  function animateList(): void {
    if (newNoti || deletedNoti) return;
    api.start({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  }

  if (loading && referrerBookPath) return <LoaderCircle />;
  if (loading && !referrerBookPath) return <LoaderBook />;

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <SearchIndex />
      {showFirstBook ? <AddYourFirstBook /> : <ListSection myBooks={myBooks} />}
      <PopUps profileImg={profileImg} profileName={profileName} UID={UID} />
      <AccelerationAlert />
      <Bot />
    </animated.main>
  );
}
