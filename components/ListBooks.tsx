import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { animateOpacity } from "@/utils/helpers";
import { animListAtom, searchAtom, stateAtom } from "@/utils/atoms";
import { noop } from "es-toolkit";
import { useRecoilState } from "recoil";
import type { Component } from "@/utils/types";
import { useEffect } from "react";

export default function ListBooks(props: Props): Component {
  const { listBooks } = props,
    [searchVal] = useRecoilState<string>(searchAtom),
    [stateVal] = useRecoilState<string>(stateAtom),
    [animateCard] = useRecoilState<boolean>(animListAtom),
    [animations] = useLocalStorage("animations", true),
    [styles, api] = useSpring(() => noop());

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
      {listBooks}
    </animated.ul>
  );
}

interface Props {
  listBooks: Component;
}
