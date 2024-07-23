import type { Component } from "@/utils/types";
import { ArrowLeft as Icon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

function BackBtn({ hidden }: { hidden: boolean }): Component {
  return (
    <Link
      href="/"
      className={twMerge(
        hidden ? "flex sm:hidden" : "flex",
        "absolute top-10 xl:top-[69px] xl:pt-2 right-0 xl:right-[28rem] opacity-90 w-full justify-center items-center"
      )}
    >
      <Icon
        size={45}
        className="z-30 cursor-pointer duration-150 hover:brightness-200"
      />
    </Link>
  );
}

export default BackBtn;
