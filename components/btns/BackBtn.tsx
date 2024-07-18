import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { isEqual } from "es-toolkit";
import { ArrowLeft as Icon } from "lucide-react";
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
    <div className="absolute top-10 xl:top-[69px] xl:pt-2 right-0 xl:right-[28rem] opacity-90 w-full flex justify-center items-center">
      <Icon
        onClick={goTo}
        size={45}
        className="z-30 cursor-pointer duration-150 hover:brightness-200"
      />
    </div>
  );
}

export default BackBtn;
