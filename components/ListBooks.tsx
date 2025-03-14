import BookCardRecommendation from "./BookCardRecommendation";
import useGuest from "@/hooks/useGuest";
import useLocalStorage from "@/hooks/useLocalStorage";
import useTitles from "@/hooks/useTitles";
import { animateOpacity } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { animListAtom, searchAtom, stateAtom } from "@/utils/atoms";
import { BOOK_RECO } from "@/utils/consts";
import { noop } from "es-toolkit";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";

function ListBooks(props: Props): Component {
  const { listBooks, showDetails, showFavs, ascToDesc, isSearch } = props,
    [searchVal] = useRecoilState<string>(searchAtom),
    [stateVal] = useRecoilState<string>(stateAtom),
    [animateCard] = useRecoilState<boolean>(animListAtom),
    [recommendations] = useLocalStorage("recommendations", true),
    [animations] = useLocalStorage("animations", true),
    [styles, api] = useSpring(() => noop()),
    { isRepeated } = useTitles(BOOK_RECO.title ?? ""),
    isSpanish: boolean = useTranslation("global").i18n.language == "es",
    { isGuest } = useGuest(),
    showReco: boolean =
      recommendations &&
      isSpanish &&
      !isGuest &&
      !isRepeated &&
      !isSearch &&
      !searchVal &&
      !stateVal &&
      !showFavs &&
      ascToDesc;

  useEffect(() => {
    if (!animations) return;
    api.start(animateOpacity(1, 600));
  }, [animateCard, searchVal, stateVal]);

  return (
    <animated.ul
      style={styles}
      className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-hidden h-auto"
      data-testid="list-books"
    >
      {showReco && <BookCardRecommendation showDetails={showDetails} />}
      {listBooks}
    </animated.ul>
  );
}

export default ListBooks;

interface Props {
  listBooks: Component;
  showDetails: boolean;
  showFavs: boolean;
  ascToDesc: boolean | null;
  isSearch?: boolean;
}
