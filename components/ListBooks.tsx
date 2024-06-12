"use client";
import HomeIcon from "@/components/HomeIcon";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useSessionExists from "@/utils/hooks/useSessionExists";
import { checkboxValue, collectionDB, inputSearch } from "@/utils/store";
import { ToggleDetailsIcon } from "@/utils/svgs";
import type { AccountInfo, Book, Component, DocumentData } from "@/utils/types";
import { Query, getDocs, query, where as whereFB } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import NoMatchesText from "./NoMatchesText";

function ListBooks(props: Props): Component {
  const { myBooks } = props,
    [inputVal] = useRecoilState(inputSearch),
    [stateVal] = useRecoilState(checkboxValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on"),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [initialBooks, setInitialBooks] = useState<Array<object>>([{}]),
    [loadExamples, setLoadExamples] = useState(false),
    { userLoggedIn, userNotLoggedIn } = useSessionExists();

  useEffect(() => {
    if (userNotLoggedIn) loadExampleBooks();
  }, [userNotLoggedIn]);

  useEffect(() => {
    if (listModeOn) setShowDetails(true);
  }, [listModeOn]);

  async function loadExampleBooks(): Promise<void> {
    const books: object[] = await exampleBooks();
    setInitialBooks(books);
    setLoadExamples(true);
  }

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  function renderBooks(books: object[]): Component {
    if (books.length == 0 && loadExamples) return <NoMatchesText />;
    return books.map((b: Book) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
    ));
  }

  function where(value: string, check: string): object[] {
    const books = userLoggedIn ? myBooks : initialBooks,
      tLC = (val: string) => val?.toLowerCase().trim(),
      checkState = (b: Book) => !check || b.state == stateVal,
      checkTitle = (b: any) => tLC(b.title)?.includes(tLC(value)),
      checkAuthor = (b: any) => tLC(b.author)?.includes(tLC(value));

    return books?.filter(
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
  const booksArr: Array<object> = [];
  const q: Query = query(collectionDB, whereFB("owner", "==", "examples"));
  const querySnapshot: DocumentData = await getDocs(q);
  querySnapshot.forEach((b: DocumentData) => booksArr.push(b.data()));
  return booksArr;
}

interface Props {
  myBooks: Array<object>;
  accountInfo: AccountInfo;
}
