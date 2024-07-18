import useLocalStorage from "@/hooks/useLocalStorage";
import icon from "@/public/favicon.ico";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useEffect } from "react";

function AppIcon(): Component {
  const [animations] = useLocalStorage("animations", true);
  const [styles, animate] = useSpring(() => ({
    opacity: animations ? 0 : 1,
    config: { duration: 550 },
  }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <animated.div
      style={styles}
      className="hidden sm:flex select-none px-3.5 py-2 rounded-full cursor-default justify-between items-center bg-purple-700/10 fixed top-5 left-5 gap-x-3"
    >
      <Image src={icon} width={35} height={35} alt="logo" />
      <p className="text-xl text-purple-200/90">Lymbrarie</p>
    </animated.div>
  );
}

export default AppIcon;
