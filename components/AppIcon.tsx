import useLocalStorage from "@/hooks/useLocalStorage";
import icon from "@/public/favicon.ico";
import { inputSearchVal, stateBookVal } from "@/utils/store";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function AppIcon(): Component {
  const MyLink = animated(Link),
    [, setState] = useRecoilState<string>(stateBookVal),
    [, setSearch] = useRecoilState<string>(inputSearchVal),
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 600 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  function onClick(): void {
    setSearch("");
    setState("");
  }

  return (
    <MyLink
      href="/"
      style={styles}
      onClick={onClick}
      className="hidden xl:flex px-3.5 py-2 rounded-full cursor-default justify-between items-center bg-purple-700/10 fixed top-5 left-5 gap-x-3"
    >
      <Image src={icon} width={35} height={35} alt="logo" />
      <p className="text-xl text-purple-200/90">Lymbrarie</p>
    </MyLink>
  );
}

export default AppIcon;
