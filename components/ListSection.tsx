import HomeBtn from "@/components/btns/HomeBtn";
import { normalizeText, tLC } from "@/utils/helpers";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { inputSearch, stateBookValue } from "@/utils/store";
import type { Book, BookData, Component, MemoComponent } from "@/utils/types";
import { isEqual, isNull, orderBy, round, shuffle } from "es-toolkit";
import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import BookCard from "./BookCard";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import DetailsBtn from "./btns/DetailsBtn";
import FavoritesBtn from "./btns/FavoritesBtn";
import SortBtn from "./btns/SortBtn";
import { useTranslation } from "react-i18next";

const ListSection: MemoComponent = memo(function B({ myBooks }: Props) {
  const [t] = useTranslation("global"),
    [searchVal] = useRecoilState<string>(inputSearch),
    [stateVal] = useRecoilState<string>(stateBookValue),
    [showDetailsLS, setShowDetailsLS] = useLocalStorage("list-mode-on", true),
    [showDetails, setShowDetails] = useState<boolean>(showDetailsLS),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [ascLS, setAscLS] = useLocalStorage("asc", true),
    [ascToDesc, setAscToDesc] = useState<boolean | null>(ascLS),
    [showFavsLS, setShowFavsLS] = useLocalStorage("showFavs", false),
    [showFavs, setShowFavs] = useState<boolean>(showFavsLS),
    myFavs: Book[] = myBooks.filter((b: Book) => b?.data?.isFav);

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

  const renderBooks = (arr: Book[]): Component => {
    const noMatches: boolean = isEqual(arr.length, 0) && searchVal != "",
      data: BookData[] = arr.map((b: Book) => b?.data),
      order: any[] = ascToDesc ? ["asc", "desc"] : ["desc", "asc"],
      books: BookData[] = isNull(ascToDesc)
        ? shuffle(data)
        : orderBy(data, ["title", "author"], order);

    if (noMatches || (isEqual(books.length, 0) && showFavs))
      return <NoMatchesText t={t(showFavs ? "no-favs" : "no-matches")} />;

    return books.map((b: BookData) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
    ));
  };

  function where(value: string, state: string): Book[] {
    const checkState = (b: BookData) => !state || isEqual(b.state, stateVal),
      checkTitle = (b: BookData) =>
        normalizeText(tLC(b.title ?? ""))?.includes(normalizeText(tLC(value))),
      checkAuthor = (b: BookData) => tLC(b.author ?? "")?.includes(tLC(value)),
      books: Book[] = showFavs ? myFavs : myBooks;

    return books.filter(
      (b: Book) =>
        checkState(b.data) && (checkTitle(b.data) || checkAuthor(b.data))
    );
  }

  function handleScroll(): void {
    const position: number = Number(round(scrollY, 0));
    setScroll(position);
  }

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setShowDetailsLS(!showDetails);
  }

  function alternateSort(): void {
    switch (ascToDesc) {
      case true:
        setAscToDesc(false);
        setAscLS(false);
        break;
      case false:
        setAscToDesc(null);
        setAscLS(null);
        break;
      default:
        setAscToDesc(true);
        setAscLS(true);
        break;
    }
  }

  function alternateFavorites(): void {
    setShowFavs(!showFavs);
    setShowFavsLS(!showFavs);
  }

  const listBooks: Component = useMemo(
    () => renderBooks(where(searchVal, stateVal)),
    [searchVal, stateVal, showDetails, ascToDesc, showFavs, myBooks]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <HomeBtn />
        <DetailsBtn showDetails={showDetails} onClick={changeDetails} />
        <SortBtn ascToDesc={ascToDesc} alternateSort={alternateSort} />
        <FavoritesBtn
          showFavs={showFavs}
          alternateFavorites={alternateFavorites}
        />
      </div>
      <ListBooks listBooks={listBooks} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
}
