import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import { PAGES } from "@/utils/consts";
import { pathIs } from "@/utils/helpers";
import { twJoin } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

export default function FooterIndex(): Component {
  const [t] = useTranslation("global"),
    { isMobile } = useIsMobile(),
    dontShow: boolean =
      isMobile &&
      (pathIs(PAGES.RECOMMENDATION) ||
        pathIs(PAGES.BOOK) ||
        pathIs(PAGES.GUEST));

  if (dontShow) return <></>;

  return (
    <>
      <div
        className={twJoin(
          "h-20 mt-20 w-full text-transparent",
          (pathIs(PAGES.RECOMMENDATION) ||
            pathIs(PAGES.BOOK) ||
            pathIs(PAGES.GUEST)) &&
            "mt-52"
        )}
      >
        .
      </div>
      <footer className="w-full bg-base-200 hidden sm:flex justify-center items-center absolute bottom-0 left-0">
        <div className="footer text-base-content p-10 max-w-[1800px]">
          <aside>
            <Link href={PAGES.HOME} className="link link-hover footer-title">
              {t("home")}
            </Link>
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
            <Link href={PAGES.FAQ} className="link link-hover">
              FAQ
            </Link>
            <Link
              className="link link-hover"
              href="mailto:gixi.tsx@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              gixi.tsx@gmail.com
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
        </div>
      </footer>
    </>
  );
}
