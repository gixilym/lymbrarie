"use client";
import AddYourFirstBook from "@/components/AddYourFirstBook";
import ListSection from "@/components/ListSection";
import LoaderCircle from "@/components/LoaderCircle";
import PopUps from "@/components/PopUps";
import SearchIndex from "@/components/SearchIndex";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { getDocuments, syncDocuments } from "@/utils/documents";
import { len } from "@/utils/helpers";
import { noop } from "es-toolkit";
import { showNotifications } from "@/utils/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { zeroAtom } from "@/utils/atoms";
import type { Book, Component, SyncDocs } from "@/utils/types";
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { AuthAction, type User, useUser, withUser } from "next-firebase-auth";
import useLoadContent from "@/hooks/useLoadContent";

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
    { startLoading, isLoading, finishLoading } = useLoadContent(),
    [newNoti] = useLocalStorage("added", false),
    [deletedNoti] = useLocalStorage("deleted", false),
    [zeroBooks] = useRecoilState<boolean>(zeroAtom),
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

    startLoading();
    const { books, isEmpty } = await getDocuments(UID);
    setMyBooks(books);
    setBooksIsEmpty(isEmpty);
    setCacheBooks(books);
    setAllTitles(books.map((b: Book) => b?.data?.title ?? ""));
    finishLoading();
  }

  function animateList(): void {
    if (newNoti || deletedNoti) return;
    api.start({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  }

  if (isLoading) return <LoaderCircle />;

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <SearchIndex UID={UID} />
      {showFirstBook ? <AddYourFirstBook /> : <ListSection myBooks={myBooks} />}
      <PopUps
        profileImg={profileImg}
        profileName={profileName}
        UID={UID}
        isGuest={false}
      />
    </animated.main>
  );
}
