import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { animListAtom, searchAtom, stateAtom } from "@/utils/atoms";
import { noop } from "es-toolkit";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import type { Component } from "@/utils/types";

function ListBooks({ listBooks }: Props): Component {
  const [searchVal] = useRecoilState<string>(searchAtom),
    [stateVal] = useRecoilState<string>(stateAtom),
    [animateCard] = useRecoilState<boolean>(animListAtom),
    [animations] = useLocalStorage("animations", true),
    [styles, api] = useSpring(() => noop());

  useEffect(() => {
    if (!animations) return;
    api.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 600 },
    });
  }, [animateCard, searchVal, stateVal]);

  return (
    <animated.ul
      style={styles}
      className="mb-36 flex flex-col justify-start w-full items-center gap-y-4 sm:overflow-hidden h-auto"
    >
      {listBooks}
    </animated.ul>
  );
}

export default ListBooks;

interface Props {
  listBooks: Component;
}
