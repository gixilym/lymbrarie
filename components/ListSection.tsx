import HomeBtn from "@/components/btns/HomeBtn";
import { tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useSessionExists from "@/utils/hooks/useSessionExists";
import {
  collectionDB,
  EXAMPLES_BOOKS,
  inputSearch,
  stateBookValue,
} from "@/utils/store";
import type {
  Book,
  BookData,
  Component,
  Doc,
  Document,
  MemoComponent,
} from "@/utils/types";
import { getDocs, Query, query, where as whereFB } from "firebase/firestore";
import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import SortBtn from "./btns/SortBtn";
import ToggleDetailsBtn from "./btns/ToggleDetailsBtn";

const ListSection: MemoComponent = memo(function L({ myBooks }: Props) {
  const [inputVal] = useRecoilState(inputSearch),
    [stateVal] = useRecoilState(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on", true),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [sortAToZ, setSortAToZ] = useLocalStorage("sort", true),
    [aToZ, setAToZ] = useState<boolean>(false),
    [initialBooks, setInitialBooks] = useState<Book[]>([]),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [loadExamples, setLoadExamples] = useState<boolean>(false),
    { userLoggedIn, userNotLoggedIn } = useSessionExists();

  useEffect(() => {
    const resetScroll = (): void => setScroll(0);
    addEventListener("beforeunload", resetScroll);
    return () => removeEventListener("beforeunload", resetScroll);
  }, []);

  useEffect(() => {
    scrollTo({ top: scroll, behavior: "instant" });
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, [myBooks]);

  useEffect(() => {
    if (userNotLoggedIn) loadExampleBooks();
  }, [userNotLoggedIn]);

  useEffect(() => {
    if (sortAToZ) setAToZ(true);
  }, [sortAToZ]);

  useEffect(() => {
    if (listModeOn) setShowDetails(true);
  }, [listModeOn]);

  async function loadExampleBooks(): Promise<void> {
    const books: Book[] = await exampleBooks();
    setInitialBooks(books);
    setLoadExamples(true);
  }

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  function alternateSort(): void {
    setAToZ(!aToZ);
    setSortAToZ(!aToZ);
    location.reload();
  }

  function renderBooks(books: Book[]): Component {
    const condition =
      (books.length == 0 && loadExamples && inputVal) ||
      (books.length == 0 && !loadExamples && userLoggedIn && inputVal);

    if (condition) return <NoMatchesText />;

    const sortedBooks: Book[] = aToZ
      ? books.sort((a: Book, b: Book) => {
          const titleA = a.data.title ?? "";
          const titleB = b.data.title ?? "";
          return titleA.localeCompare(titleB);
        })
      : books;

    return sortedBooks.map((b: Book) => (
      <BookCard key={b.id} data={b.data} showDetails={showDetails} />
    ));
  }

  function where(value: string, state: string): Book[] {
    const books: Book[] = userLoggedIn ? myBooks : initialBooks,
      checkState = (b: BookData) => !state || b.state == stateVal,
      checkTitle = (b: BookData) =>
        normalizeText(tLC(b.title ?? ""))?.includes(normalizeText(tLC(value))),
      checkAuthor = (b: BookData) => tLC(b.author ?? "")?.includes(tLC(value));

    return books.filter(
      (b: Book) =>
        checkState(b.data) && (checkTitle(b.data) || checkAuthor(b.data))
    );
  }

  function handleScroll(): void {
    const position: number = Number(scrollY.toFixed(0));
    setScroll(position);
  }

  function normalizeText(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const listBooks: Component = useMemo(
    () => renderBooks(where(inputVal, stateVal)),
    [inputVal, stateVal, myBooks, showDetails, initialBooks]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <HomeBtn />
        <ToggleDetailsBtn showDetails={showDetails} onClick={changeDetails} />
        <SortBtn alternateSort={alternateSort} atoz={aToZ} />
      </div>
      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

async function exampleBooks(): Promise<Book[]> {
  const books: Array<Book> = [];
  const q: Query = query(collectionDB, whereFB("owner", "==", EXAMPLES_BOOKS));
  const res: Document = await getDocs(q);
  res.forEach((doc: Doc) =>
    books.push({ id: String(Math.random()), data: doc.data() })
  );
  return books;
}

interface Props {
  myBooks: Book[];
}
