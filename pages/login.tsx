import LoadComponent from "@/components/LoadComponent";
import logo from "@/public/favicon.ico";
import { PRODUCTION } from "@/utils/consts";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GithubIcon, GoogleIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import {
  type Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { AuthAction, withUser } from "next-firebase-auth";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: LoadComponent,
})(LoginPage);

function LoginPage(): Component {
  const [t] = useTranslation("global"),
    { push }: NextRouter = useRouter(),
    [animations] = useLocalStorage("animations", true),
    auth: Auth = getAuth(),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  async function logIn(provider: Providers): Promise<void> {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (PRODUCTION) push("/error");
      else console.error(`error en logIn: ${err.message}`);
    }
  }

  function withGoogle(): void {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    logIn(provider);
  }

  function withGithub(): void {
    const provider: GithubAuthProvider = new GithubAuthProvider();
    logIn(provider);
  }

  // function withFacebook(): void {
  //   const provider: FacebookAuthProvider = new FacebookAuthProvider();
  //   logIn(provider);
  // }

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex items-start justify-center bg-transparent sm:pt-20">
      <animated.div
        style={styles}
        className="border-0 sm:border-2 border-slate-700/70 relative py-14 sm:rounded-lg bg-slate-900 flex flex-col gap-y-10 justify-start sm:justify-center items-center w-full max-w-[580px] pb-20 min-h-screen sm:min-h-min"
      >
        <div className="w-full flex flex-col justify-start items-center gap-y-4">
          <Image
            className="w-20 h-20 border-2 border-slate-500/70 rounded-full"
            src={logo}
            alt="logo"
          />
          <h4 className="text-xl sm:text-3xl tracking-tight  w-full text-center text-slate-200">
            {t("welcome")}
          </h4>
          <p className="text-sm sm:text-lg text-center text-slate-400">
            {t("book-find")}
          </p>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-3">
          <button
            onClick={withGoogle}
            className="bg-slate-400/10 justify-start gap-x-6 px-10 hover:bg-slate-100/10
 flex items-center min-w-[330px] sm:w-full max-w-[410px] h-14 rounded-lg border border-slate-500/40 duration-150 "
          >
            <GoogleIcon className="w-7 h-7" />
            <p className="text-sm sm:text-xl text-white">{t("with-google")}</p>
          </button>
          <button
            onClick={withGithub}
            className="bg-black/60 border border-slate-800 justify-start gap-x-6 px-11 hover:bg-slate-950/70
flex items-center min-w-[330px] sm:w-full max-w-[413px] h-[60px] rounded-lg duration-150"
          >
            <GithubIcon className="w-7 h-7" />
            <p className="text-sm sm:text-xl text-white">{t("with-github")}</p>
          </button>
          {/* <button
            onClick={withFacebook}
            className="bg-blue-600/70 justify-start gap-x-6 px-6 hover:bg-blue-600/90
 flex items-center min-w-[330px] sm:w-full max-w-[400px] !h-14 rounded-lg border border-slate-500/40 duration-150 "
          >
            <FacebookIcon className="w-7 h-7" />
            <p className="text-lg sm:text-xl text-white">
              {t("with-facebook")}
            </p>
          </button> */}
          <Link
            className="absolute bottom-4 cursor-default text-xs text-slate-400/80 sm:text-[16px] hover:underline duration-100 hover:text-slate-400"
            href="/privacypolicy"
          >
            {t("privacy-policy")}
          </Link>
        </div>
      </animated.div>
    </section>
  );
}

type Providers = GithubAuthProvider | GoogleAuthProvider;
