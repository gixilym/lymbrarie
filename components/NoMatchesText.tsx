import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";

function NoMatchesText({ t }: any): Component {
  const [animations] = useLocalStorage("animations", true);
  const [styles] = useSpring(() => ({
    from: { opacity: animations ? 0 : 1 },
    to: { opacity: 1 },
  }));

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
