import usePopUp from "@/hooks/usePopUp";
import logo from "@/public/favicon.ico";
import type { Component } from "@/utils/types";
import { isNull } from "es-toolkit";
import {
  Heart as HeartIcon,
  Shield as PrivacyIcon,
  MessageCircleQuestion as SupportIcon,
  User as UserIcon,
} from "lucide-react";
import { useUser, withUser } from "next-firebase-auth";
import Image from "next/image";
import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export default withUser()(FooterIndex);

function FooterIndex(): Component {
  const [t] = useTranslation("global"),
    { openPopUp } = usePopUp(),
    { id }: { id: string | null } = useUser(),
    { pathname, push }: NextRouter = useRouter(),
    noHome: boolean = pathname != "/",
    dontShow: boolean =
      isNull(id) || pathname == "/login" || pathname == "/logout";

  return (
    <footer
      className={twMerge(
        dontShow ? "hidden" : "flex",
        pathname.includes("/book/") && "hidden sm:flex",
        "select-none footer absolute bottom-0 w-full flex-col-reverse sm:flex-row justify-between items-center sm:p-4 bg-slate-900 border-t-2 border-gray-800 py-2 sm:py-0 sm:h-14 text-gray-400"
      )}
    >
      <div className="hidden sm:grid items-center grid-flow-col px-4 sm:px-0">
        <Image
          loading="lazy"
          width={30}
          height={30}
          className="border rounded-full border-gray-700"
          src={logo}
          alt="logo"
        />
        <p translate="no">Copyright © 2024 Lymbrarie - {t("copyright")}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center pl-3 sm:pl-0 justify-evenly w-full h-auto sm:w-auto sm:gap-x-6">
        <div
          onClick={() => {
            noHome && push("/");
            openPopUp("profile");
          }}
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
          onClick={() => {
            noHome && push("/");
            openPopUp("donations");
          }}
        >
          <HeartIcon size={18} />
          <p className="text-sm sm:text-[16px]">{t("donate")}</p>
        </div>
        <div
          onClick={() => {
            noHome && push("/");
            openPopUp("support");
          }}
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
