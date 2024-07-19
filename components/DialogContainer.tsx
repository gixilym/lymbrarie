import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { twJoin } from "tailwind-merge";

function DialogContainer(props: Props): Component {
  const { children, divClass } = props,
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => ({
      from: { transform: animations ? "scale(0.7)" : "scale(1)" },
      to: { transform: "scale(1)" },
      config: { duration: 100 },
    }));

  return (
    <dialog className="w-full h-full fixed top-0 z-40 flex justify-center items-start bg-transparent backdrop-blur-md">
      <animated.div
        style={styles}
        className={twJoin(
          divClass,
          "modal-box sm:max-w-[700px] w-full min-h-screen sm:min-h-0 sm:h-[560px] overflow-x-hidden rounded-none sm:rounded-2xl flex flex-col gap-y-3 border-2 border-rose-300/10 [&>label>input]:placeholder:text-gray-400 sm:mt-14 overflow-y-scroll sm:overflow-y-auto"
        )}
      >
        {children}
      </animated.div>
    </dialog>
  );
}

export default DialogContainer;

interface Props {
  divClass?: string;
  children: React.ReactNode;
}
