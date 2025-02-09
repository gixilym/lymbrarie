import BookCard from "./BookCard";
import DetailsBtn from "./btns/DetailsBtn";
import FavoritesBtn from "./btns/FavoritesBtn";
import ListBooks from "./ListBooks";
import NoMatchesText from "./NoMatchesText";
import SortBtn from "./btns/SortBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { BoltIcon, UserRoundIcon } from "lucide-react";
import { isEqual, isNull, orderBy, round, shuffle } from "es-toolkit";
import { len, normalizeText, tLC } from "@/utils/helpers";
import { memo, useEffect, useMemo, useState } from "react";
import { searchAtom, stateAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Book, BookData, Component, MemoComponent } from "@/utils/types";

const ListSection: MemoComponent = memo(function B({ myBooks }: Props) {
  const [t] = useTranslation("global"),
    [searchVal] = useRecoilState<string>(searchAtom),
    [stateVal] = useRecoilState<string>(stateAtom),
    [showDetailsLS, setShowDetailsLS] = useLocalStorage("show-details", true),
    [showDetails, setShowDetails] = useState<boolean>(showDetailsLS),
    [scroll, setScroll] = useLocalStorage("scroll", 0),
    [ascLS, setAscLS] = useLocalStorage("asc", true),
    [ascToDesc, setAscToDesc] = useState<boolean | null>(ascLS),
    [showFavsLS, setShowFavsLS] = useLocalStorage("show-favs", false),
    [showFavs, setShowFavs] = useState<boolean>(showFavsLS),
    myFavs: Book[] = myBooks.filter((b: Book) => b?.data?.isFav),
    { openPopUp } = usePopUp();

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
    const data: BookData[] = arr.map((b: Book) => b?.data),
      order: any[] = ascToDesc ? ["asc", "desc"] : ["desc", "asc"],
      books: BookData[] = isNull(ascToDesc)
        ? shuffle(data)
        : orderBy(data, ["title", "author"], order),
      noMatches: boolean =
        (isEqual(len(arr), 0) && !isEqual(searchVal, "")) ||
        (isEqual(len(books), 0) && showFavs) ||
        (isEqual(searchVal, "") &&
          !isEqual(stateVal, "") &&
          isEqual(len(books), 0));

    if (noMatches)
      return (
        <NoMatchesText
          t={t(showFavs && !searchVal ? "no-favs" : "no-matches")}
        />
      );

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

  const renderList: Component = useMemo(
    () => renderBooks(where(searchVal, stateVal)),
    [searchVal, stateVal, showDetails, ascToDesc, showFavs, myBooks]
  );

  return (
    <section className="w-full px-4 sm:px-0 sm:w-[620px] flex flex-col justify-between items-center gap-y-7 relative">
      <div className="flex justify-start w-full items-end px-2.5">
        <button
          onClick={() => openPopUp("profile")}
          title={t("profile")}
          className="btn btn-ghost btn-square"
        >
          <UserRoundIcon size={28} />
        </button>
        <DetailsBtn showDetails={showDetails} onClick={changeDetails} />
        <SortBtn ascToDesc={ascToDesc} alternateSort={alternateSort} />
        <FavoritesBtn
          showFavs={showFavs}
          alternateFavorites={alternateFavorites}
        />
        <button
          onClick={() => openPopUp("settings")}
          title={t("settings")}
          className="btn btn-ghost btn-square"
        >
          <BoltIcon size={28} />
        </button>
      </div>
      <ListBooks listBooks={renderList} />
    </section>
  );
});

export default ListSection;

interface Props {
  myBooks: Book[];
}
