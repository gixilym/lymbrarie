import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function FooterIndex(): Component {
  const [t] = useTranslation("global"),
    path: string = usePathname(),
    isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (
    (isMobile && path?.includes("/book")) ||
    (isMobile && path?.includes("/guest"))
  )
    return <></>;

  return (
    <footer
      className={twJoin(
        path?.includes("/book") && "mt-20",
        "footer bg-base-200 text-base-content p-10 w-[100vw]"
      )}
    >
      <aside>
        <Image src="/favicon.ico" alt="logo" width={40} height={40} />
        <p>Copyright &copy; {new Date().getFullYear()} Lymbrarie</p>
        <Link href="/" className="link link-hover">
          {t("home")}
        </Link>
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
        <Link href="/faq" className="link link-hover">
          FAQ
        </Link>
      </nav>
      <nav>
        <p className="footer-title">{t("legal")}</p>
        <Link href="/termsofuse" className="link link-hover">
          {t("terms")}
        </Link>
        <Link href="/privacypolicy" className="link link-hover">
          {t("privacy-policy")}
        </Link>
      </nav>
      <nav>
        <p className="footer-title">Extra</p>
        <Link href="/donations" className="link link-hover">
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
