import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function AddYourFirstBook(): Component {
  const [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      transform: animations ? "scale(0)" : "scale(1)",
    }));

  useEffect(() => {
    if (animations) animate.start({ transform: "scale(1)" });
  }, [animate]);

  return (
    <animated.p
      style={styles}
      className="text-gray-200/70 text-2xl font-pop font-normal w-full text-center"
    >
      {t("first-book")}
    </animated.p>
  );
}

export default AddYourFirstBook;
