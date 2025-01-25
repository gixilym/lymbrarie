import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoaderCircle from "@/components/LoaderCircle";
import logo from "@/public/favicon.ico";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { AuthAction, withUser } from "next-firebase-auth";
import { GithubIcon, GoogleIcon } from "@/utils/svgs";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import {
  type Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: LoaderCircle,
})(LoginPage);

function LoginPage(): Component {
  const auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  async function logIn(provider: Providers): Promise<void> {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(`catch 'logIn' ${err.message}`);
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

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex flex-col items-center gap-y-20 justify-center bg-transparent sm:pt-4">
      <Head>
        <meta name="title" content="Lymbrarie - Tu biblioteca personal" />
        <meta
          name="description"
          content="Organiza y lleva un seguimiento de tus lecturas"
        />
      </Head>
      <animated.div
        style={styles}
        className="border-0 sm:border-2 border-slate-700/70 relative pt-10 sm:rounded-lg bg-slate-900 flex flex-col gap-y-10 justify-start sm:justify-center items-center w-full max-w-[580px] pb-20 min-h-screen sm:min-h-min"
      >
        <p className="text-xs sm:text-sm tracking-tight text-slate-200 border border-slate-500/40 rounded px-2 py-1 absolute top-2.5 right-2.5 bg-purple-600/30">
          {t("version")} 2.0
        </p>
        <div className="w-full flex flex-col justify-start items-center gap-y-4">
          <Image
            className="w-20 h-20 border-2 border-slate-500/70 rounded-full"
            src={logo}
            alt="logo"
          />
          <h4 className="text-xl sm:text-3xl tracking-tight  w-full text-center text-slate-200">
            {t("welcome")}
          </h4>
          <p className="text-sm sm:text-lg text-center text-slate-300/85">
            {t("book-find")}
          </p>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-3">
          <button
            type="button"
            onClick={withGoogle}
            className="bg-slate-400/10 justify-start gap-x-6 px-10 hover:bg-slate-100/10
 flex items-center min-w-[330px] sm:w-full max-w-[410px] h-14 rounded-lg border border-slate-500/40 duration-150 "
          >
            <GoogleIcon className="w-7 h-7" />
            <p className="text-sm sm:text-xl text-white">{t("with-google")}</p>
          </button>
          <button
            type="button"
            onClick={withGithub}
            className="bg-black/60 border border-slate-800 justify-start gap-x-6 px-11 hover:bg-slate-950/70
flex items-center min-w-[330px] sm:w-full max-w-[413px] h-[60px] rounded-lg duration-150"
          >
            <GithubIcon className="w-7 h-7" />
            <p className="text-sm sm:text-xl text-white">{t("with-github")}</p>
          </button>
          <div className="absolute bottom-3 w-full cursor-default text-xs text-slate-400/80 sm:text-[16px] flex flex-col justify-center items-center gap-y-2">
            <Link
              className="hover:underline duration-100 hover:text-slate-400"
              href="/faq"
            >
              FAQ
            </Link>
            <Link
              className="hover:underline duration-100 hover:text-slate-400"
              href="/privacypolicy"
            >
              {t("privacy-policy")}
            </Link>
          </div>
        </div>
      </animated.div>
    </section>
  );
}

type Providers = GithubAuthProvider | GoogleAuthProvider;
