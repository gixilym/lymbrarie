import logo from "@/public/favicon.ico";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LogoutPage(): Component {
  const { push }: NextRouter = useRouter(),
    [animations] = useLocalStorage("animations", true),
    [t] = useTranslation("global"),
    [, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [, setAllTitles] = useLocalStorage("allTitles", []),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 400 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  function forgetSession(): void {
    setCacheBooks(null);
    setAllTitles([]);
    signOut({ callbackUrl: "/login" });
  }

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex items-start justify-center bg-transparent pt-16 sm:pt-24">
      <Head>
        <title>{t("see-you-soon")}</title>
      </Head>
      <animated.div
        style={styles}
        className="border-2 border-slate-700/70 py-14 sm:rounded-lg bg-slate-900 flex flex-col gap-y-14 justify-center items-center w-full max-w-[580px]"
      >
        <div className="w-full flex flex-col justify-start items-center gap-y-4">
          <Image
            className="w-20 h-20 border-2 border-slate-500/70 rounded-full"
            src={logo}
            alt="logo"
          />
          <h4 className="text-2xl sm:text-3xl tracking-tight w-full text-center">
            {t("see-you-soon")}
          </h4>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-3.5">
          <button
            onClick={forgetSession}
            className="bg-red-800/90 justify-center hover:bg-red-700 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg border-2 border-red-300/40 duration-150 "
          >
            <p className="text-lg sm:text-xl text-white">{t("logout")}</p>
          </button>
          <button
            onClick={() => push("/?guest=false")}
            className="bg-slate-100/10 flex items-center justify-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg duration-150 hover:bg-blue-300/30"
          >
            <p className="text-lg sm:text-xl text-slate-100">{t("cancel")}</p>
          </button>
        </div>
      </animated.div>
    </section>
  );
}

export default LogoutPage;
