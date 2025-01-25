import type { Component, PopUpsIds } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";

import type { MouseEventHandler } from "react";
import { noop } from "es-toolkit";
import { twJoin } from "tailwind-merge";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";

function DialogContainer(props: Props): Component {
  const { children, divClass, id } = props,
    { closePopUp } = usePopUp(),
    close: boolean = id != "notes" && id != "edit_book",
    [animations] = useLocalStorage("animations", true),
    handleClick: Fn = () => (close ? closePopUp(id) : noop()),
    [styles] = useSpring(() => ({
      from: { transform: animations ? "scale(0.7)" : "scale(1)" },
      to: { transform: "scale(1)" },
      config: { duration: 120 },
    }));

  return (
    <dialog
      onClick={handleClick}
      className="w-full h-full fixed top-0 z-40 flex justify-center items-start bg-transparent backdrop-blur-md"
    >
      <animated.div
        style={styles}
        onClick={e => e.stopPropagation()}
        className={twJoin(
          "modal-box sm:max-w-[600px] w-full min-h-screen sm:min-h-0 sm:h-[450px] overflow-x-hidden rounded-none sm:rounded-2xl flex flex-col gap-y-3 border-2 relative z-50 border-blue-300/10 [&>label>input]:placeholder:text-gray-400 sm:mt-10 overflow-y-auto justify-between",
          divClass
        )}
      >
        {children}
      </animated.div>
    </dialog>
  );
}

export default DialogContainer;

type Fn = MouseEventHandler<HTMLDialogElement>;

interface Props {
  divClass?: string;
  children: React.ReactNode;
  id: PopUpsIds;
}
