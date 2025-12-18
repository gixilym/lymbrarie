import BookCard from "./BookCard";
import DetailsBtn from "./btns/DetailsBtn";
import FavoritesBtn from "./btns/FavoritesBtn";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import SortBtn from "./btns/SortBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import { deburr, delay, isEqual, isNull, orderBy, shuffle } from "es-toolkit";
import { len, pathIs, tLC } from "@/utils/helpers";
import { memo, useEffect, useMemo, useState } from "react";
import { PAGES } from "@/utils/consts";
import { useRecoilState } from "recoil";
import {
  scrollAtom,
  searchAtom,
  shuffleAtom,
  stateAtom,
  showFavsAtom,
} from "@/utils/atoms";
import type {
  Book,
  BookData,
  Component,
  MemoComponent,
  SortModes,
  ShuffleAtom,
} from "@/utils/types";

const ListSection: MemoComponent = memo(function B(props: Props) {
  const { myBooks, isSearch } = props,
    [searchVal] = useRecoilState<string>(searchAtom),
    [stateVal] = useRecoilState<string>(stateAtom),
    [showDetailsLS, setShowDetailsLS] = useLocalStorage("show-details", true),
    [showDetails, setShowDetails] = useState<boolean>(showDetailsLS),
    [scrollLS, setScrollLS] = useLocalStorage("scroll-editpopup", null),
    [scroll] = useRecoilState(scrollAtom),
    [ascSortLS, setSortLS] = useLocalStorage("sort", "asc"),
    [ascSort, setSort] = useState<SortModes>(ascSortLS),
    [showFavs, setShowFavs] = useRecoilState<boolean>(showFavsAtom),
    [shuffledData, setShuffledData] = useRecoilState<ShuffleAtom>(shuffleAtom),
    myFavs: Book[] = myBooks.filter((b: Book) => b?.data?.isFav),
    filteredBooks: Book[] = useMemo(
      () => where(searchVal, stateVal),
      [searchVal, stateVal, showFavs, myBooks]
    );

  useEffect(() => {
    if (pathIs(PAGES.HOME, { exact: true })) {
      scrollTo({ top: scrollLS ?? scroll, behavior: "instant" });

      if (!isNull(scrollLS)) {
        (async () => {
          await delay(1000);
          setScrollLS(null);
        })();
      }
    }
  }, [myBooks]);

  useEffect(() => {
    if (ascSort == "random" && len(filteredBooks) > 0) {
      const needsNewShuffle: boolean =
        !shuffledData ||
        shuffledData.version !== JSON.stringify(filteredBooks) ||
        shuffledData.mode !== "shuffle";

      if (needsNewShuffle) {
        const data: BookData[] = filteredBooks.map(b => b.data);
        setShuffledData({
          data: shuffle(data),
          version: JSON.stringify(filteredBooks),
          mode: "shuffle",
        });
      }
    }
  }, [filteredBooks, ascSort]);

  function renderBooks(arr: Book[]): Component {
    const data: BookData[] = arr.map((b: Book) => b?.data),
      order: Order = ascSort == "asc" ? ["asc", "desc"] : ["desc", "asc"],
      books: BookData[] =
        ascSort == "random"
          ? shuffledData?.data || []
          : orderBy(data, ["title"], order),
      noMatches: boolean =
        (isEqual(len(arr), 0) && !isEqual(searchVal, "")) ||
        (isEqual(len(books), 0) && showFavs) ||
        (isEqual(searchVal, "") &&
          !isEqual(stateVal, "") &&
          isEqual(len(books), 0));

    if (noMatches)
      return (
        <NoMatchesText
          txt={showFavs && !searchVal ? "no-favs" : "no-matches"}
        />
      );

    return books.map((b: BookData) => (
      <BookCard key={b.title} data={b} showDetails={showDetails} />
    ));
  }

  function where(value: string, state: string): Book[] {
    const checkState = (b: BookData) => !state || isEqual(b.state, stateVal),
      checkTitle = (b: BookData) =>
        deburr(tLC(b.title ?? ""))?.includes(deburr(tLC(value))),
      checkAuthor = (b: BookData) =>
        deburr(tLC(b.author ?? ""))?.includes(deburr(tLC(value))),
      books: Book[] = showFavs ? myFavs : myBooks;

    return books.filter(
      (b: Book) =>
        checkState(b.data) && (checkTitle(b.data) || checkAuthor(b.data))
    );
  }

  function changeDetails(): void {
    setShowDetails(!showDetails);
    setShowDetailsLS(!showDetails);
  }

  function toggleSort(): void {
    switch (ascSort) {
      case "asc":
        setSort("desc");
        setSortLS("desc");
        break;
      case "desc":
        setSort("random");
        setSortLS("random");
        break;
      default:
        setSort("asc");
        setSortLS("asc");
        break;
    }
  }

  const renderList: Component = useMemo(
    () => renderBooks(where(searchVal, stateVal)),
    [searchVal, stateVal, showDetails, ascSort, showFavs, myBooks, shuffledData]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      {!isSearch && (
        <div className="flex justify-start w-full items-center px-2.5">
          <DetailsBtn showDetails={showDetails} onClick={changeDetails} />
          <SortBtn ascSort={ascSort} toggleSort={toggleSort} />
          <FavoritesBtn toggleFavs={() => setShowFavs(!showFavs)} />
          {showFavs && (
            <p className="pl-4 pt-0.5 text-[15px] text-slate-300/80">
              Favoritos
            </p>
          )}
        </div>
      )}
      <ListBooks listBooks={renderList} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
  isSearch: boolean;
}

type Order = ("asc" | "desc")[];
