import TextEditor from "@/components/TextEditor";
import { animateOpacity } from "@/utils/helpers";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";

export default function WriterPage(): Component {
  const [styles] = useSpring(() => animateOpacity(1, 400));

  return (
    // <animated.section
    //   style={styles}
    //   className="relative max-w-2xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8 [&>p]:w-full [&>p]:text-pretty"
    // >
    <TextEditor />
  );
}

{
  /* </animated.section> */
}
