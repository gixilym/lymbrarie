import Link from "next/link";
import { animateOpacity } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function PrivacyPolicyPage(): Component {
  const [t] = useTranslation("global");
  const [styles] = useSpring(() => animateOpacity(1, 400));

  return (
    <animated.section
      style={styles}
      className="relative max-w-2xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8 [&>p]:w-full [&>p]:text-pretty"
    >
      <p>{t("privacy-1")}</p>
      <p>{t("privacy-2")}</p>
      <p>{t("privacy-3")}</p>
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

export default PrivacyPolicyPage;
