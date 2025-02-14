import Link from "next/link";
import { ArrowLeft as Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { Component } from "@/utils/types";

function BackBtn({
  hidden,
  isGuest,
}: {
  hidden: boolean;
  isGuest?: boolean;
}): Component {
  return (
    <Link
      href={isGuest ? "/guest" : "/"}
      className={twMerge(
        hidden ? "flex sm:hidden" : "flex",
        "absolute top-10 right-[150px] opacity-90 justify-center items-center w-full z-50"
      )}
    >
      <Icon
        size={45}
        className="cursor-pointer duration-150 hover:brightness-200"
      />
    </Link>
  );
}

export default BackBtn;
