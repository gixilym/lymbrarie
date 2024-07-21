import BackBtn from "@/components/btns/BackBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function PrivacyPolicyPage(): Component {
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
      className="max-w-2xl w-full px-6 sm:px-0 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8 [&>p]:w-full [&>p]:text-pretty"
    >
      <BackBtn />
      <p className="mt-20 sm:mt-6">{t("privacy-1")}</p>

      <p>{t("privacy-2")}</p>
      <p>{t("privacy-3")}</p>
      <p> {t("privacy-4")}</p>
      <address className="text-sm sm:text-lg w-full">
        {t("contact")}:&nbsp;&nbsp;
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
