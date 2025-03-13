import AddYourFirstBook from "@/components/AddYourFirstBook";
import IndexBanner from "@/components/banners/IndexBanner";
import ListSection from "@/components/ListSection";
import LoaderCircle from "@/components/LoaderCircle";
import SearchIndex from "@/components/SearchIndex";
import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animate, len } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { getDocuments, syncDocuments } from "@/utils/documents";
import { noop } from "es-toolkit";
import { showNotifications } from "@/utils/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { zeroAtom } from "@/utils/atoms";
import type { Book, Component, ArgsSync } from "@/utils/types";
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
    profileName: string = user?.displayName as string,
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    [, setAllTitles] = useLocalStorage("all-titles", []),
    [booksIsEmpty, setBooksIsEmpty] = useState<boolean | null>(null),
    { startLoading, isLoading, finishLoading } = useLoadContent(),
    [newNoti] = useLocalStorage("added", false),
    [deletedNoti] = useLocalStorage("deleted", false),
    [zeroBooks] = useRecoilState<boolean>(zeroAtom),
    showFirstBookMsg: boolean = booksIsEmpty || zeroBooks,
    [nameuser] = useLocalStorage("username", ""),
    username: string = nameuser.trim() == "" ? profileName : nameuser,
    [styles, api] = useSpring(() => animate(0, 1, 1000)),
    argsSync: ArgsSync = {
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
    api.start(animate(0, 1, 400));
  }

  if (isLoading) return <LoaderCircle />;

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <IndexBanner username={username} />
      <SearchIndex />
      {showFirstBookMsg ? (
        <AddYourFirstBook />
      ) : (
        <ListSection myBooks={myBooks} isSearch={false} />
      )}
    </animated.main>
  );
}
