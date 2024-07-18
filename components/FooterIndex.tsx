import usePopUp from "@/hooks/usePopUp";
import type { Component } from "@/utils/types";
import {
  Heart as HeartIcon,
  MessageCircleQuestion as SupportIcon,
  User as UserIcon,
  Shield as PrivacyIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import logo from "@/public/favicon.ico";

function FooterIndex(): Component {
  const [t] = useTranslation("global");
  const { openPopUp } = usePopUp();

  return (
    <footer className="select-none footer absolute bottom-0 w-full flex flex-col-reverse sm:flex-row justify-between items-center sm:p-4 bg-slate-900 border-t-2 border-gray-800 py-2 sm:py-0 sm:h-14 text-gray-400">
      <aside className="hidden sm:grid items-center grid-flow-col px-4 sm:px-0">
        <Image
          loading="lazy"
          width={30}
          height={30}
          className="border rounded-full border-gray-700"
          src={logo}
          alt="logo"
        />
        <p className="">Copyright © 2024 Lymbrarie - {t("copyright")}</p>
      </aside>
      <div className="flex flex-col sm:flex-row items-start sm:items-center pl-3 sm:pl-0 justify-evenly w-full h-auto sm:w-auto sm:gap-x-6">
        <div
          onClick={() => openPopUp("profile")}
          className={
            "flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline"
          }
        >
          <UserIcon size={18} />
          <p className="text-sm sm:text-[16px] hover:underline duration-75 cursor-pointer ">
            {t("profile")}
          </p>
        </div>
        <div
          className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline "
          onClick={() => openPopUp("donations")}
        >
          <HeartIcon size={18} />
          <p className="text-sm sm:text-[16px]">{t("donate")}</p>
        </div>
        <div
          onClick={() => openPopUp("support")}
          className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline "
        >
          <SupportIcon size={18} />
          <p className="text-sm sm:text-[16px]">{t("support")}</p>
        </div>

        <div
          className={
            "flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline"
          }
        >
          <PrivacyIcon size={18} />
          <Link className="text-sm sm:text-[16px]" href="/privacypolicy">
            {t("privacy-policy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default FooterIndex;
