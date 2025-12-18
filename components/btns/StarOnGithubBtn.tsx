import Link from "next/link";
import { GithubIcon } from "@/utils/svgs";
import { StarIcon } from "lucide-react";
import type { Component } from "@/utils/types";

function StarOnGithubBtn(): Component {
  return (
    <Link
      target="_blank"
      href="https://github.com/gixilym/lymbrarie"
      className="fixed bottom-4 right-4 bg-slate-950/60 backdrop-blur-sm z-50 border border-violet-500/20 hover:border-violet-500/40 px-4 py-2 rounded-xl flex items-center gap-x-3 transition-all "
    >
      <GithubIcon className="w-5 h-5" />
      <span className="text-slate-300">Estrella en Github</span>
      <StarIcon className="w-4 h-4 text-yellow-300" />
    </Link>
  );
}

export default StarOnGithubBtn;
