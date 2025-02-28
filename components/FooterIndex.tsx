import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/utils/consts";
import { pathIs } from "@/utils/helpers";
import { twJoin } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function FooterIndex(): Component {
  const [t] = useTranslation("global"),
    isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    dontShow: boolean =
      isMobile &&
      (pathIs(PAGES.RECOMMENDATION) ||
        pathIs(PAGES.BOOK) ||
        pathIs(PAGES.GUEST));

  if (dontShow) return <></>;

  return (
    <footer
      className={twJoin(
        "footer bg-base-200 text-base-content p-10 w-[100vw]",
        (pathIs(PAGES.RECOMMENDATION) ||
          pathIs(PAGES.BOOK) ||
          pathIs(PAGES.GUEST)) &&
          "mt-20"
      )}
    >
      <aside>
        <div className="flex gap-x-4 mb-2 items-end justify-start">
          <Image src="/favicon.ico" alt="logo" width={30} height={30} />
          <Link href={PAGES.HOME} className="link link-hover">
            {t("home")}
          </Link>
        </div>
        <p>
          Lymbrarie {t("unlicense")}{" "}
          <Link
            className="hover:underline font-semibold"
            target="_blank"
            href="https://unlicense.org"
          >
            UNLICENSE
          </Link>
        </p>
      </aside>
      <nav>
        <p className="footer-title">{t("support")}</p>
        <Link
          className="link link-hover"
          href="mailto:gixi.tsx@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          gixi.tsx@gmail.com
        </Link>
        <Link href={PAGES.FAQ} className="link link-hover">
          FAQ
        </Link>
      </nav>
      <nav>
        <p className="footer-title">{t("legal")}</p>
        <Link href={PAGES.TERMSOFUSE} className="link link-hover">
          {t("terms")}
        </Link>
        <Link href={PAGES.PRIVACYPOLICY} className="link link-hover">
          {t("privacy-policy")}
        </Link>
      </nav>
      <nav>
        <p className="footer-title">Extra</p>
        <Link href={PAGES.DONATIONS} className="link link-hover">
          {t("donations")}
        </Link>
        <Link
          href="https://www.flaticon.es/icono-gratis/libro_806197"
          referrerPolicy="no-referrer"
          target="_blank"
          className="link link-hover"
        >
          {t("icon-of")} Freepik
        </Link>
      </nav>
    </footer>
  );
}

export default FooterIndex;
