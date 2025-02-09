import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function TermsOfUsePage(): Component {
  const [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  return (
    <animated.section
      style={styles}
      className="relative max-w-2xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8 [&>p]:w-full [&>p]:text-pretty"
    >
      <Link
        href="/"
        className="w-full text-xl underline text-center sm:text-start absolute"
      >
        {t("back")}
      </Link>
      <p className="mt-20 xl:mt-14">{t("terms-1")}</p>
      <p>{t("terms-2")}</p>
      <p>{t("terms-3")}</p>
      <p> {t("terms-4")}</p>
      <p> {t("terms-5")}</p>
      <p> {t("terms-6")}</p>
      <p> {t("terms-7")}</p>
      <p> {t("terms-8")}</p>
      <p> {t("terms-9")}</p>
      <p> {t("privacy-4")}</p>
      <address className="text-sm sm:text-lg w-full">
        <Link
          className="text-blue-400 no-underline hover:text-blue-300 cursor-pointer duration-75"
          href="mailto:gixi.tsx@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          gixi.tsx@gmail.com
        </Link>
      </address>
    </animated.section>
  );
}

export default TermsOfUsePage;
