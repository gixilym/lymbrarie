import usePopUp from "@/utils/hooks/usePopUp";
import type { Component } from "@/utils/types";
import {
  Heart as HeartIcon,
  MessageCircleQuestion as SupportIcon,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function FooterMain(): Component {
  const [t] = useTranslation("global");
  const { openPopUp } = usePopUp();

  return (
    <footer className="footer absolute bottom-0 w-full flex flex-col-reverse sm:flex-row justify-between items-center sm:p-4 bg-slate-300/10 text-neutral-content py-2 sm:py-0 sm:h-14">
      <aside className="items-center grid-flow-col px-4 sm:px-0">
        <Image
          width={30}
          height={30}
          className="border rounded-full border-gray-700"
          src="https://res.cloudinary.com/dgs55s8qh/image/upload/v1711605978/ppwljpmujdgqzuskudws.ico"
          alt="logo"
        />
        <p>Copyright © 2024 Lymbrarie - {t("Footer.copyright")}</p>
      </aside>
      <div className="flex space-x-4">
        <div className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline hover:text-slate-300">
          <p
            onClick={() => openPopUp("profile")}
            className="text-lg hover:underline duration-75 cursor-pointer hover:text-slate-300"
          >
            {t("HomeIcon.profile")}
          </p>
          <UserIcon size={18} />
        </div>

        <div className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline hover:text-slate-300">
          <p onClick={() => openPopUp("support")} className="text-lg">
            {t("Footer.support")}
          </p>
          <SupportIcon size={18} />
        </div>

        <div
          className="flex duration-75 cursor-pointer flex-row justify-start items-center gap-x-2 hover:underline hover:text-slate-300"
          onClick={() => openPopUp("donations")}
        >
          <p className="text-lg">{t("Footer.donate")}</p>
          <HeartIcon size={18} />
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;
