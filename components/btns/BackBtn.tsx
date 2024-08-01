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
        "absolute top-10 xl:top-[72px] xl:pt-2 right-20 2xl:left-[20rem] opacity-90 w-max justify-center items-center"
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
