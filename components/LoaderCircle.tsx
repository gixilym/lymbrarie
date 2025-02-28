import type { Component } from "@/utils/types";
import { twMerge } from "tailwind-merge";

function LoaderCircle({ containerClass, spinnerClass }: Props): Component {
  return (
    <div
      className={twMerge(
        "w-full h-screen absolute top-0 left-0 flex items-start pt-20 justify-center z-[999] bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950",
        containerClass
      )}
    >
      <span
        className={twMerge(
          "loading loading-spinner text-secondary w-14",
          spinnerClass
        )}
      />
    </div>
  );
}

export default LoaderCircle;

interface Props {
  containerClass?: string;
  spinnerClass?: string;
}
