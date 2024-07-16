import HomeBtn from "@/components/btns/HomeBtn";
import { normalizeText, tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { inputSearch, stateBookValue } from "@/utils/store";
import type { Book, BookData, Component, MemoComponent } from "@/utils/types";
import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import ToggleDetailsBtn from "./btns/ToggleDetailsBtn";

const ListSection: MemoComponent = memo(function B({ myBooks }: Props) {
  const [inputVal] = useRecoilState<string>(inputSearch),
    [stateVal] = useRecoilState<string>(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on", true),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
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
    if (listModeOn) setShowDetails(true);
  }, [listModeOn]);

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  const renderBooks = (books: Book[]): Component => {
    const condition: boolean = books.length == 0 && inputVal != "";

    if (condition) return <NoMatchesText />;

    const sortedBooks: Book[] = books.sort((a: Book, b: Book) => {
      const titleA = a.data.title ?? "";
      const titleB = b.data.title ?? "";
      return titleA.localeCompare(titleB);
    });

    return sortedBooks.map((b: Book) => (
      <BookCard key={b.id} data={b.data} showDetails={showDetails} />
    ));
  };

  function where(value: string, state: string): Book[] {
    const checkState = (b: BookData) => !state || b.state == stateVal,
      checkTitle = (b: BookData) =>
        normalizeText(tLC(b.title ?? ""))?.includes(normalizeText(tLC(value))),
      checkAuthor = (b: BookData) => tLC(b.author ?? "")?.includes(tLC(value));

    return myBooks.filter(
      (b: Book) =>
        checkState(b.data) && (checkTitle(b.data) || checkAuthor(b.data))
    );
  }

  function handleScroll(): void {
    const position: number = Number(scrollY.toFixed(0));
    setScroll(position);
  }

  const listBooks: Component = useMemo(
    () => renderBooks(where(inputVal, stateVal)),
    [inputVal, stateVal, myBooks, showDetails]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <HomeBtn />
        <ToggleDetailsBtn showDetails={showDetails} onClick={changeDetails} />
      </div>
      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
}
