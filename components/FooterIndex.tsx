import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import {
  Heart as HeartIcon,
  MessageCircleQuestion as SupportIcon,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

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
          src="https://res.cloudinary.com/dgs55s8qh/image/upload/v1711605978/ppwljpmujdgqzuskudws.ico"
          alt="logo"
        />
        <p className="">Copyright © 2024 Lymbrarie - {t("copyright")}</p>
      </aside>
      <div className="flex items-center justify-evenly w-full h-10 sm:h-auto sm:w-auto sm:gap-x-6">
        <div
          onClick={() => openPopUp("profile")}
          className={
            "flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline"
          }
        >
          <p className="text-lg hover:underline duration-75 cursor-pointer ">
            {t("profile")}
          </p>
          <UserIcon size={18} />
        </div>

        <div
          onClick={() => openPopUp("support")}
          className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline "
        >
          <p className="text-lg">{t("support")}</p>
          <SupportIcon size={18} />
        </div>

        <div
          className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline "
          onClick={() => openPopUp("donations")}
        >
          <p className="text-lg">{t("donate")}</p>
          <HeartIcon size={18} />
        </div>
      </div>
    </footer>
  );
}

export default FooterIndex;
