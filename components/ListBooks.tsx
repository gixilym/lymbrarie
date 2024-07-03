"use client";
import HomeIcon from "@/components/HomeIcon";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useSessionExists from "@/utils/hooks/useSessionExists";
import {
  collectionDB,
  EXAMPLES_BOOKS,
  inputSearch,
  stateBookValue,
} from "@/utils/store";
import { ToggleDetailsIcon } from "@/utils/svgs";
import type { Book, Component, Document, MemoComponent } from "@/utils/types";
import { getDocs, Query, query, where as whereFB } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import NoMatchesText from "./NoMatchesText";

const ListBooks: MemoComponent = memo(function ListBooksMemo(props: Props) {
  const { myBooks } = props,
    [inputVal] = useRecoilState(inputSearch),
    [stateVal] = useRecoilState(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on"),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [loadExamples, setLoadExamples] = useState<boolean>(false),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [initialBooks, setInitialBooks] = useState<Book[]>([]),
    { userLoggedIn, userNotLoggedIn } = useSessionExists();

  useEffect(() => {
    scrollTo({ top: scroll, behavior: "smooth" });
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (userNotLoggedIn) loadExampleBooks();
  }, [userNotLoggedIn]);

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

  function renderBooks(books: Book[]): Component {
    const condition =
      (books.length == 0 && loadExamples && inputVal) ||
      (books.length == 0 && !loadExamples && userLoggedIn && inputVal);

    if (condition) return <NoMatchesText />;

    return books.map((b: Book) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
    ));
  }

  function where(value: string, check: string): Book[] {
    const books: Book[] = userLoggedIn ? myBooks : initialBooks,
      tLC = (val: string) => val?.toLowerCase().trim(),
      checkState = (b: Book) => !check || b.state == stateVal,
      checkTitle = (b: Book) => tLC(b.title ?? "")?.includes(tLC(value)),
      checkAuthor = (b: Book) => tLC(b.author ?? "")?.includes(tLC(value));

    return books.filter(
      (b: Book) => checkState(b) && (checkTitle(b) || checkAuthor(b))
    );
  }

  function handleScroll(): void {
    const position = window.pageYOffset;
    setScroll(position);
  }

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-4">
      <div className="flex justify-start w-full items-center gap-x-2">
        <HomeIcon />
        <ToggleDetailsIcon showDetails={showDetails} onClick={changeDetails} />
      </div>

      <ul className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-y-auto sm:overflow-x-hidden sm:h-[485px]">
        {renderBooks(where(inputVal, stateVal))}
      </ul>
    </section>
  );
});

export default ListBooks;

async function exampleBooks(): Promise<Book[]> {
  const booksArr: Array<Book> = [];
  const q: Query = query(collectionDB, whereFB("owner", "==", EXAMPLES_BOOKS));
  const querySnapshot: Document = await getDocs(q);
  querySnapshot.forEach((b: Document) => booksArr.push(b?.data()));
  return booksArr;
}

interface Props {
  myBooks: Book[];
}
