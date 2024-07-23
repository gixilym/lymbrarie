import useLocalStorage from "@/hooks/useLocalStorage";
import icon from "@/public/favicon.ico";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";

function AppIcon(): Component {
  const [animations] = useLocalStorage("animations", true),
    MyLink = animated(Link),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    }));

  return (
    <MyLink
      href="/"
      style={styles}
      className="hidden lg:flex px-3.5 py-2 rounded-full cursor-default justify-between items-center bg-purple-700/10 fixed top-5 left-5 gap-x-3"
    >
      <Image src={icon} width={35} height={35} alt="logo" />
      <p className="text-xl text-purple-200/90" translate="no">
        Lymbrarie
      </p>
    </MyLink>
  );
}

export default AppIcon;
