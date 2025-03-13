import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function AnnasURL(): Component {
  const [t] = useTranslation("global");
  return (
    <div className="text-sm text-center w-full text-slate-100 flex justify-center items-center">
      <Link
        href="https://es.annas-archive.org/search"
        target="_blank"
        className="opacity-70 hover:opacity-100 duration-75 link link-hover w-max items-center justify-center flex gap-x-1 pr-3.5"
      >
        <LinkIcon size={12} className="text-violet-300 mt-[1px]" />
        <p className="text-slate-300">
          {t("annas-text")}{" "}
          <span className="text-violet-300">Anna&apos;s Archive</span>
        </p>
      </Link>
    </div>
  );
}

export default AnnasURL;
