import Link from "next/link";
import { ChevronLeft as Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function Breadcrumbs({ isGuest }: { isGuest: boolean }): Component {
  const [t] = useTranslation("global");

  return (
    <div className="w-full max-w-[715px] absolute top-10 hidden sm:block">
      <Link
        href={isGuest ? "/guest" : "/"}
        className="flex justify-start items-center cursor-pointer hover:underline gap-x-2 w-max opacity-70 hover:opacity-100"
      >
        <Icon size={22} />
        <span className="capitalize text-xl">{t("home")}</span>
      </Link>
    </div>
  );
}

export default Breadcrumbs;
