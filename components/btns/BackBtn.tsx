import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { isEqual } from "es-toolkit";
import { CircleChevronLeft as Icon } from "lucide-react";
import { type NextRouter, useRouter } from "next/router";
import { flushSync } from "react-dom";

function BackBtn(): Component {
  const { push }: NextRouter = useRouter();
  const [animations] = useLocalStorage("animations", true);

  function goTo(): Promise<boolean> {
    const condition: boolean =
      // @ts-ignore
      isEqual(typeof document.startViewTransition, "function") && animations;

    return condition
      ? // @ts-ignore
        document.startViewTransition(() => flushSync(() => push("/")))
      : push("/");
  }

  return (
    <div className="absolute top-10 xl:top-16 xl:pt-2 right-0 xl:right-[36rem] w-full flex justify-center items-center">
      <Icon
        onClick={goTo}
        size={50}
        color="#dad8d8"
        className="z-30 cursor-pointer hover:scale-110 duration-150"
      />
    </div>
  );
}

export default BackBtn;
