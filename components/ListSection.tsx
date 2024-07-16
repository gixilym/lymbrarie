import HomeBtn from "@/components/btns/HomeBtn";
import { normalizeText, tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { inputSearch, stateBookValue } from "@/utils/store";
import type { Book, BookData, Component, MemoComponent } from "@/utils/types";
import { orderBy } from "es-toolkit";
import { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import DetailsBtn from "./btns/DetailsBtn";
import SortBtn from "./btns/SortBtn";

const ListSection: MemoComponent = memo(function B({ myBooks }: Props) {
  const [inputVal] = useRecoilState<string>(inputSearch),
    [stateVal] = useRecoilState<string>(stateBookValue),
    [listModeOn, setListModeOn] = useLocalStorage("list-mode-on", true),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [ascToDesc, setAscToDesc] = useState<boolean>(true),
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

  const renderBooks = (arr: Book[]): Component => {
    const condition: boolean = arr.length == 0 && inputVal != "",
      data: BookData[] = arr.map((b: Book) => b.data),
      order: any[] = ascToDesc ? ["asc", "desc"] : ["desc", "asc"],
      sorted: BookData[] = orderBy(data, ["title", "author"], order);

    if (condition) return <NoMatchesText />;

    return sorted.map((b: BookData) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
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

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setListModeOn(!showDetails);
  }

  const alternateSort = (): void => setAscToDesc(!ascToDesc);

  const listBooks: Component = renderBooks(where(inputVal, stateVal));

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <HomeBtn />
        <DetailsBtn showDetails={showDetails} onClick={changeDetails} />
        <SortBtn ascToDesc={ascToDesc} alternateSort={alternateSort} />
      </div>
      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
}
