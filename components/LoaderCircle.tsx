import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";

function LoaderCircle(): Component {
  const [styles] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
    delay: 150,
  }));

  return (
    <animated.div
      style={styles}
      className="mt-20 w-full h-full flex justify-center items-start opacity-80">
      <span className="loading loading-spinner text-secondary w-14" />
    </animated.div>
  );
}

export default LoaderCircle;
