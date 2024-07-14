import HomeBtn from "@/components/btns/HomeBtn";
import { EXAMPLES_BOOKS } from "@/utils/consts";
import { tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { inputSearch, stateBookValue } from "@/utils/store";
import type { Book, BookData, Component, MemoComponent } from "@/utils/types";
import { type NextRouter, useRouter } from "next/router";
import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import ToggleDetailsBtn from "./btns/ToggleDetailsBtn";

const ListSection: MemoComponent = memo(function L({
  myBooks,
  isLogged,
}: Props) {
  const [inputVal] = useRecoilState<string>(inputSearch),
    [stateVal] = useRecoilState<string>(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on", true),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    router: NextRouter = useRouter(),
    [sortAToZ, setSortAToZ] = useLocalStorage("sort", true),
    [aToZ, setAToZ] = useState<boolean>(false),
    [initialBooks, setInitialBooks] = useState<Book[]>([]),
    [showDetails, setShowDetails] = useState<boolean>(false);

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
    if (!isLogged) setInitialBooks(EXAMPLES_BOOKS);
  }, [isLogged]);

  useEffect(() => {
    if (sortAToZ) setAToZ(true);
  }, [sortAToZ]);

  useEffect(() => {
    if (listModeOn) setShowDetails(true);
  }, [listModeOn]);

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  function alternateSort(): void {
    setAToZ(!aToZ);
    setSortAToZ(!aToZ);
    router.reload();
  }

  const renderBooks = (books: Book[]): Component => {
    const condition =
      (books.length == 0 && inputVal) ||
      (books.length == 0 && isLogged && inputVal);

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
  };

  function where(value: string, state: string): Book[] {
    const books: Book[] = isLogged ? myBooks : initialBooks,
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

  //* probar quitando este memo para a-z sin recargar
  const listBooks: Component = useMemo(
    () => renderBooks(where(inputVal, stateVal)),
    [inputVal, stateVal, myBooks, showDetails, initialBooks]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <HomeBtn isLogged={isLogged} />
        <ToggleDetailsBtn showDetails={showDetails} onClick={changeDetails} />
        {/* <SortBtn alternateSort={alternateSort} atoz={aToZ} />} */}
      </div>
      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
  isLogged: boolean;
}
