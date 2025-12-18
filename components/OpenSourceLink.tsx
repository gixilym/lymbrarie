import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Component } from "@/utils/types";

function OpenSourceLink(): Component {
  return (
    <Link
      href="https://github.com/gixilym/lymbrarie"
      target="_blank"
      className="flex items-center justify-center gap-x-2 text-slate-400 hover:text-violet-300 transition-colors"
    >
      <ChevronRightIcon className="w-3.5 h-3.5" />
      <span className="text-sm md:text-[16px]">
        Lymbrarie es un proyecto de código abierto
      </span>
      <ChevronLeftIcon className="w-3.5 h-3.5" />
    </Link>
  );
}

export default OpenSourceLink;
