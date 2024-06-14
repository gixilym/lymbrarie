"use client";
import HomeIcon from "@/components/HomeIcon";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useSessionExists from "@/utils/hooks/useSessionExists";
import { checkboxValue, collectionDB, inputSearch } from "@/utils/store";
import { ToggleDetailsIcon } from "@/utils/svgs";
import type { Book, Component, DocumentData } from "@/utils/types";
import { Query, getDocs, query, where as whereFB } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AddYourFirstBook from "./AddYourFirstBook";
import BookCard from "./BookCard";
import NoMatchesText from "./NoMatchesText";
import LoadComponent from "./LoadComponent";

function ListBooks(props: Props): Component {
  const { myBooks } = props,
    [inputVal] = useRecoilState(inputSearch),
    [stateVal] = useRecoilState(checkboxValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on"),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [initialBooks, setInitialBooks] = useState<Array<Book>>([]),
    [loadExamples, setLoadExamples] = useState<boolean>(false),
    [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(true),
    [showAddFirstBook, setShowAddFirstBook] = useState<boolean>(false),
    { userLoggedIn, userNotLoggedIn } = useSessionExists();

  useEffect(() => {
    if (userNotLoggedIn) return;
    const checkBooksTimeout = setTimeout(() => {
      if (myBooks.length == 0) {
        setShowAddFirstBook(true);
      }
      setIsLoadingBooks(false);
    }, 2000);
    return () => clearTimeout(checkBooksTimeout);
  }, [myBooks, userNotLoggedIn]);

  useEffect(() => {
    if (userNotLoggedIn) loadExampleBooks();
  }, [userNotLoggedIn]);

  useEffect(() => {
    if (listModeOn) setShowDetails(true);
  }, [listModeOn]);

  async function loadExampleBooks(): Promise<void> {
    setIsLoadingBooks(true);
    const books: Book[] = await exampleBooks();
    setInitialBooks(books);
    setLoadExamples(true);
    setIsLoadingBooks(false);
  }

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  function renderBooks(books: Book[]): Component {
    if (isLoadingBooks) return <LoadComponent />;

    if (showAddFirstBook) return <AddYourFirstBook />;

    if (
      (books.length == 0 && loadExamples && inputVal) ||
      (books.length == 0 && !loadExamples && userLoggedIn && inputVal)
    ) {
      return <NoMatchesText />;
    }

    return books.map((b: Book) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
    ));
  }

  function where(value: string, check: string): Book[] {
    const books: Book[] = userLoggedIn ? myBooks : initialBooks,
      tLC = (val: string) => val?.toLowerCase().trim(),
      checkState = (b: Book) => !check || b.state === stateVal,
      checkTitle = (b: Book) => tLC(b.title ?? "")?.includes(tLC(value)),
      checkAuthor = (b: Book) => tLC(b.author ?? "")?.includes(tLC(value));

    return books.filter(
      (b: Book) => checkState(b) && (checkTitle(b) || checkAuthor(b))
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-4"
    >
      <div className="flex justify-start w-full items-center gap-x-2">
        <HomeIcon />
        <ToggleDetailsIcon showDetails={showDetails} onClick={changeDetails} />
      </div>

      <ul className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-y-auto sm:overflow-x-hidden sm:h-[485px]">
        {renderBooks(where(inputVal, stateVal))}
      </ul>
    </motion.div>
  );
}

export default ListBooks;

async function exampleBooks() {
  const booksArr: Array<Book> = [];
  const q: Query = query(collectionDB, whereFB("owner", "==", "examples"));
  const querySnapshot: DocumentData = await getDocs(q);
  querySnapshot.forEach((b: DocumentData) => booksArr.push(b.data()));
  return booksArr;
}

interface Props {
  myBooks: Book[];
}
