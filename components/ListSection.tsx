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
import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import NoMatchesText from "./NoMatchesText";
import ListBooks from "./ListBooks";
import { tLC } from "@/utils/helpers";

const ListSection: MemoComponent = memo(function ListSectionMemo(props: Props) {
  const { myBooks, isLoading } = props,
    [inputVal] = useRecoilState(inputSearch),
    [stateVal] = useRecoilState(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on"),
    [animations] = useLocalStorage("animations", "true"),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [initialBooks, setInitialBooks] = useState<Book[]>([]),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [loadExamples, setLoadExamples] = useState<boolean>(false),
    { userLoggedIn, userNotLoggedIn } = useSessionExists();

  useEffect(() => {
    scrollTo({ top: scroll, behavior: animations ? "smooth" : "instant" });
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, [myBooks]); // eslint-disable-line

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

  function where(value: string, state: string): Book[] {
    const books: Book[] = userLoggedIn ? myBooks : initialBooks,
      checkState = (b: Book) => !state || b.state == stateVal,
      checkTitle = (b: Book) =>
        normalizeText(tLC(b.title ?? ""))?.includes(normalizeText(tLC(value))),
      checkAuthor = (b: Book) => tLC(b.author ?? "")?.includes(tLC(value));

    return books.filter(
      (b: Book) => checkState(b) && (checkTitle(b) || checkAuthor(b))
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
    [inputVal, stateVal, myBooks, showDetails, initialBooks] // eslint-disable-line
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-center px-3">
        <HomeIcon />
        <ToggleDetailsIcon showDetails={showDetails} onClick={changeDetails} />
      </div>

      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

async function exampleBooks(): Promise<Book[]> {
  const booksArr: Array<Book> = [];
  const q: Query = query(collectionDB, whereFB("owner", "==", EXAMPLES_BOOKS));
  const querySnapshot: Document = await getDocs(q);
  querySnapshot.forEach((b: Document) => booksArr.push(b?.data()));
  return booksArr;
}

interface Props {
  myBooks: Book[];
  isLoading: boolean;
}
