import type { Component } from "@/utils/types";
import { twMerge } from "tailwind-merge";

function LoadComponent({ mt }: { mt?: boolean }): Component {
  return (
    <div
      className={twMerge(
        !mt ? "mt-20 sm:mt-28" : "mt-0",
        "w-full h-full flex justify-center items-start opacity-80"
      )}
    >
      <span className="loading loading-spinner text-secondary w-14" />
    </div>
  );
}

export default LoadComponent;
