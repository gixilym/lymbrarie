import useLocalStorage from "@/hooks/useLocalStorage";
import icon from "@/public/favicon.ico";
import { inputSearchVal, stateBookVal } from "@/utils/store";
import type { Component, SetState } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

function AppIcon(): Component {
  const [animations] = useLocalStorage("animations", true),
    MyLink = animated(Link),
    setState: SetState = useSetRecoilState<string>(stateBookVal),
    setSearch: SetState = useSetRecoilState<string>(inputSearchVal),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    }));

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
      <p className="text-xl text-purple-200/90" translate="no">
        Lymbrarie
      </p>
    </MyLink>
  );
}

export default AppIcon;
