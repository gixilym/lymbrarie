import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function NoMatchesText(): Component {
  const [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <animated.p
      style={styles}
      className=" text-gray-200/70 text-2xl  font-normal w-full text-center mt-8 h-12"
    >
      {t("no-matches")}
    </animated.p>
  );
}

export default NoMatchesText;
