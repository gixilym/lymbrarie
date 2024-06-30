import type { Component, GoTo } from "@/utils/types";
import { CircleChevronLeft as BackIcon } from "lucide-react";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";

function BackBtn(): Component {
  const { push } = useRouter();

  function goTo(): GoTo {
    const animationsEnabled: boolean = true;
    const condition: boolean =
      // @ts-ignore
      typeof document.startViewTransition == "function" && animationsEnabled;

    return condition
      ? // @ts-ignore
        document.startViewTransition(() => flushSync(() => push("/")))
      : push("/");
  }

  return (
    <div className="absolute top-10 xl:top-16 xl:pt-2 right-0 xl:right-[36rem] w-full flex justify-center items-center">
      <BackIcon
        onClick={goTo}
        size={50}
        color="white"
        className="z-30 cursor-pointer hover:scale-110 duration-100"
      />
    </div>
  );
}

export default BackBtn;
