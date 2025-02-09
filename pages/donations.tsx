import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { CoffeeIcon, CoinsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function DonationsPage(): Component {
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
      className="relative w-full mb-24 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8"
    >
      <Link
        href="/"
        className="text-xl underline text-center sm:text-start max-w"
      >
        {t("back")}
      </Link>
      <p className="text-sm sm:text-xl px-8 sm:px-0 text-center w-full max-w-xl text-pretty text-slate-200 mb-6 mt-2">
        {t("donations-text")}
      </p>
      <div className="w-full flex flex-col gap-y-4 justify-center items-center">
        <Link
          href="https://cafecito.app/gixilym"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-4 px-4 py-2 rounded-lg border-2 border-rose-300 bg-rose-400 duration-100 hover:bg-rose-400/90 text-black font-semibold w-full max-w-[300px]"
        >
          <CoffeeIcon size={25} />
          <span className="tracking-wide">{t("buy-coffee")}</span>
        </Link>
        <Link
          href="https://paypal.com/paypalme/gixilym"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-4 px-4 py-2 rounded-lg border-2 border-blue-300 bg-blue-400 duration-100 hover:bg-blue-400/90 text-black w-full max-w-[300px]"
        >
          <CoinsIcon size={25} />
          <span className="tracking-wide font-semibold">{t("paypal")}</span>
        </Link>
      </div>

      <p className="text-xl text-center w-full">❤️ {t("thanks")} ❤️</p>
    </animated.section>
  );
}

export default DonationsPage;
