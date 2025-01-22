import type { Component } from "@/utils/types";
import { ChevronRight as ArrowIcon, BookIcon, LibraryIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Breadcrumbs({ title }: { title: string }): Component {
  const [t] = useTranslation("global");

  return (
    <div className="w-full max-w-[700px] absolute top-10 hidden sm:block opacity-70">
      <ul className="gap-x-2 flex justify-start items-end text-[17px] overflow-hidden">
        {/* <li>
          <Link
            href="/"
            className="flex justify-start cursor-pointer hover:underline items-center gap-x-1">
            <HomeIcon size={15} className="mb-0.5" />
            <span className="capitalize">{t("home")}</span>
          </Link>
        </li> 
        <ArrowIcon size={23} />*/}
        <li>
          <Link
            href="/"
            className="flex justify-start items-center cursor-pointer hover:underline gap-x-1"
          >
            <LibraryIcon size={16} />
            <span className="capitalize">{t("books")}</span>
          </Link>
        </li>
        <ArrowIcon size={23} />
        <li className="w-full">
          <div className="flex justify-start items-center gap-x-1 cursor-default w-full">
            <BookIcon size={14} />
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-11/12 max-w-[350px]">
              {title}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
