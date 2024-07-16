import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { twJoin } from "tailwind-merge";

function DialogContainer(props: Props) {
  const { children, divClass } = props,
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      transform: animations ? "scale(0.5)" : "scale(1)",
      config: { duration: 100 },
    }));

  useEffect(() => {
    if (animations) animate.start({ transform: "scale(1)" });
  }, [animate]);

  return (
    <dialog className="w-full h-full absolute top-0 z-40 flex justify-center items-start bg-transparent backdrop-blur-md">
      <animated.div
        style={styles}
        className={twJoin(
          divClass,
          "modal-box max-w-[700px] w-full h-[550px] overflow-x-hidden rounded-2xl flex flex-col gap-y-3 border-2 border-rose-300/10 [&>label>input]:placeholder:text-gray-400 sm:mt-14"
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
