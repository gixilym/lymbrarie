import { animateOpacity } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import type { Component } from "@/utils/types";

function NoMatchesText({ txt }: { txt: string }): Component {
  const [styles] = useSpring(() => animateOpacity(1, 200, 200)),
    texts: Record<string, string> = {
      "no-favs": "No has añadido favoritos",
      "no-matches": "Sin coincidencias...",
    };

  return (
    <animated.p
      style={styles}
      className="text-gray-200/70 text-lg sm:text-2xl  font-normal w-full text-center mt-8 h-12"
    >
      {texts[txt] || txt}
    </animated.p>
  );
}

export default NoMatchesText;
