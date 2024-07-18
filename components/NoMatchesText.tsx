import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

function NoMatchesText({ t }: any): Component {
  const [animations] = useLocalStorage("animations", true);
  const [styles, animate] = useSpring(() => ({
    opacity: animations ? 0 : 1,
  }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <animated.p
      style={styles}
      className="text-gray-200/70 text-lg sm:text-2xl  font-normal w-full text-center mt-8 h-12"
    >
      {t}
    </animated.p>
  );
}

export default NoMatchesText;
