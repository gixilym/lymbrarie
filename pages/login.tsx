import FooterIndex from "@/components/FooterIndex";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoaderCircle from "@/components/LoaderCircle";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { AuthAction, withUser } from "next-firebase-auth";
import { GithubIcon, GoogleIcon } from "@/utils/svgs";
import { notification } from "@/utils/notifications";
import { useTranslation } from "react-i18next";
import {
  BookMarked,
  BookOpen,
  ChevronDown,
  GhostIcon,
  Sparkles,
  CircleAlert,
  StarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Component, Timer } from "@/utils/types";
import {
  type Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function LoginPage(): Component {
  const auth: Auth = getAuth(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [language, setLanguage] = useLocalStorage("language", "es"),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  async function logIn(provider: Providers): Promise<void> {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      notification("error", t("login-error"));
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
    <animated.section
      style={styles}
      className="bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 flex items-center flex-col justify-between top-0 right-0 min-h-screen w-full gap-y-20 md:gap-y-24 bg-transparent"
    >
      <Head>
        <meta name="title" content="Lymbrarie - Tu biblioteca personal" />
        <meta
          name="description"
          content="La mejor forma de gestionar tu biblioteca"
        />
      </Head>

      <header className="relative flex items-center justify-between w-full max-w-3xl pt-6 px-6 lg:px-0">
        <div className="flex items-center gap-x-3">
          <Image
            width={40}
            height={40}
            className="border rounded-full border-gray-700"
            src="/favicon.ico"
            alt="logo"
          />
          <h1 className="text-xl font-semibold">Lymbrarie</h1>
        </div>

        <div className="flex items-center gap-x-2 justify-center [&>span]:text-sm">
          <span>ES</span>
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={language == "en"}
            onChange={() => {
              setLanguage(language == "es" ? "en" : "es");
              const timer: Timer = setTimeout(() => location.reload(), 180);
              return () => clearTimeout(timer);
            }}
          />
          <span>EN</span>
        </div>
      </header>

      <section className="z-50 flex w-full flex-col items-center justify-center max-w-2xl gap-y-4 relative">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight w-full text-center text-balance">
          {t("welcome")}
        </h2>
        <p className="text-lg md:text-xl text-gray-300/90 w-full max-w-lg text-pretty text-center mb-4 mt-1">
          {t("manage-library")}
        </p>
        <div className="pt-2 items-center justify-center flex flex-col gap-y-3">
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
          <Link
            href="/guest"
            className="justify-center sm:justify-start pr-4 sm:pr-0 sm:pl-[43px]
              bg-slate-950/50 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg duration-150 hover:bg-slate-950/80"
          >
            <GhostIcon className="w-8 h-8 text-slate-200" />
            <p className="text-sm sm:text-xl text-slate-100">
              {t("access-guest")}
            </p>
          </Link>
          <Link
            href="#sect"
            className="hidden sm:flex justify-center items-center w-max animate-bounce"
          >
            <ChevronDown size={36} className="opacity-50" />
          </Link>
        </div>
      </section>

      <section
        id="sect"
        className="flex flex-wrap justify-center items-center gap-16 max-w-4xl w-full mb-20"
      >
        <article className="relative bg-slate-900/90 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <BookOpen className="h-8 w-8 text-purple-400 mb-4" />
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("organize")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("organize-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/90 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <BookMarked className="h-8 w-8 text-purple-400 mb-4" />
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("tracking")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("tracking-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/90 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <Sparkles className="h-8 w-8 text-purple-400 mb-4" />
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("discover")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("discover-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/90 z-50 w-[350px] border-red-400/20 border-2 rounded-lg p-4 md:p-6">
          <CircleAlert className="h-8 w-8 text-red-400 mb-4" />
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("important")}
          </p>
          <p className="text-sm md:text-[16px] text-gray-300/85">
            {t("warning-login")}
          </p>
        </article>
      </section>

      <Link
        href="https://github.com/gixilym/lymbrarie"
        target="_blank"
        className="link link-hover opacity-70 hover:opacity-100 flex items-center justify-center gap-x-1 w-full text-center px-4 sm:px-0"
      >
        <ChevronRight className="hidden sm:block w-4 h-4" />
        <span className="text-sm sm:text-lg">Lymbrarie {t("open-source")}</span>
        <ChevronLeft className="hidden sm:block w-4 h-4" />
      </Link>

      <Link
        target="_blank"
        href="https://github.com/gixilym/lymbrarie"
        className="bg-black/40 border border-yellow-300/10 hover:border-yellow-300/25 justify-between px-2 items-center max-w gap-x-3 h-9 rounded-xl duration-150 fixed bottom-2 right-4 z-50 cursor-pointer backdrop-blur-xl hidden sm:flex"
      >
        <GithubIcon className="w-5 h-5 opacity-80" />
        <p className="text-sm text-slate-300">{t("star")}</p>
        <StarIcon className="w-4 h-4 text-yellow-300" />
      </Link>

      <FooterIndex />
    </animated.section>
  );
}

export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: LoaderCircle,
})(LoginPage);

type Providers = GithubAuthProvider | GoogleAuthProvider;
