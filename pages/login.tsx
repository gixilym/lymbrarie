import logo from "@/public/favicon.ico";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { GoogleIcon, GithubIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { Ghost as GuestIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LoginPage(): Component {
  const { push, query }: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    book: string = JSON.parse((query.book as string) ?? "false"),
    ghost: string = JSON.parse((query.ghost as string) ?? "false"),
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 400 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex items-start justify-center bg-transparent pt-12 sm:pt-20">
      <Head>
        <title>{t("welcome")}</title>
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
          <h4 className="text-2xl sm:text-3xl tracking-tight  w-full text-center text-slate-200">
            {book ? t("sign-in-to-add") : t("welcome")}
          </h4>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-3.5">
          <button
            onClick={() => signIn("google", { callbackUrl: "/?guest=false" })}
            className="bg-slate-100/10 justify-center sm:justify-start sm:pl-12 hover:bg-slate-400/10
 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg border border-slate-500/40 duration-150 "
          >
            <GoogleIcon className="w-7 h-7" />
            <p className="text-lg sm:text-xl text-white">{t("with-google")}</p>
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="bg-black/90 border border-slate-800 justify-center sm:justify-start sm:pl-12 hover:bg-black/50
 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg  duration-150"
          >
            <GithubIcon className="w-7 h-7" />
            <p className="text-lg sm:text-xl text-white">{t("with-github")}</p>
          </button>
          <button
            onClick={() => push("/?guest=true&ghost=true")}
            className="justify-center sm:justify-start pr-3 sm:pr-0 sm:pl-12
              bg-slate-950/50 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg duration-150 hover:bg-slate-950/80"
          >
            <GuestIcon className="w-8 h-8 text-slate-200" />
            <p className="text-lg sm:text-xl text-slate-100">
              {ghost ? t("continue") : t("enter")} {t("ghost-mode")}
            </p>
          </button>
        </div>
      </animated.div>
    </section>
  );
}

export default LoginPage;
