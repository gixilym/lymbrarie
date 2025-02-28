import Favicon from "@/public/favicon.ico";
import FooterIndex from "@/components/FooterIndex";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoaderCircle from "@/components/LoaderCircle";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animate } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { AuthAction, withUser } from "next-firebase-auth";
import { GithubIcon, GoogleIcon } from "@/utils/svgs";
import { notification } from "@/utils/notifications";
import { PAGES } from "@/utils/consts";
import { useTranslation } from "react-i18next";
import {
  BookMarked,
  BookOpen,
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
    [language, setLanguage] = useLocalStorage("language", "es"),
    [styles] = useSpring(() => animate(0, 1, 400));

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
          content="La mejor forma de organizar tu biblioteca"
        />
      </Head>

      <header className="relative flex items-center justify-between w-full max-w-3xl pt-6 px-6 lg:px-0">
        <div className="flex items-center gap-x-3">
          <Image
            width={38}
            height={38}
            className="border rounded-full border-gray-700"
            src={Favicon.src}
            alt="logo"
            loading="eager"
          />
          <h1 className="text-xl font-semibold text-slate-100">Lymbrarie</h1>
        </div>

        <div className="flex items-center gap-x-2 justify-center [&>span]:text-sm">
          <span>ES</span>
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={language == "en"}
            aria-label="Change language"
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
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-300 via-violet-50 to-violet-300 text-transparent bg-clip-text">
          {t("welcome")}
        </h2>
        <p className="text-lg md:text-xl text-slate-200/90">
          {t("manage-library")}
        </p>
        <div className="pt-6 items-center justify-center flex flex-col gap-y-3">
          <button
            type="button"
            onClick={withGoogle}
            className="bg-slate-950/25 hover:bg-slate-950/55 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40 
              flex items-center justify-start gap-x-6 px-10 w-full max-w-[410px] h-14 rounded-xl transition-all"
          >
            <GoogleIcon className="w-7 h-7" />
            <p className="text-lg text-slate-200">{t("with-google")}</p>
          </button>

          <button
            type="button"
            onClick={withGithub}
            className="bg-slate-950/25 hover:bg-slate-950/55 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40
              flex items-center justify-start gap-x-6 px-10 w-full max-w-[410px] h-14 rounded-xl transition-all"
          >
            <GithubIcon className="w-7 h-7" />
            <p className="text-lg text-slate-200">{t("with-github")}</p>
          </button>

          <Link
            href={PAGES.GUEST}
            className="bg-slate-950/25 hover:bg-slate-950/55 backdrop-blur-sm border border-violet-500/20 hover:border-violet-500/40
              flex items-center justify-start gap-x-6 px-10 w-full max-w-[410px] h-14 rounded-xl transition-all"
          >
            <GhostIcon className="w-7 h-7 text-violet-300" />
            <p className="text-lg text-slate-200">{t("access-guest")}</p>
          </Link>
        </div>
      </section>

      <section
        id="sect"
        className="flex flex-wrap justify-center items-center gap-16 max-w-4xl w-full mb-10"
      >
        <article className="relative bg-slate-900/40 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <div className="bg-violet-500/20 p-3 rounded-lg w-max mb-4">
            <BookOpen className="h-6 w-6 text-violet-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("organize")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("organize-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/40 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <div className="bg-violet-500/20 p-3 rounded-lg w-max mb-4">
            <BookMarked className="h-6 w-6 text-violet-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("tracking")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("tracking-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/40 z-50 w-[350px] border border-slate-800 rounded-lg p-4 md:p-6">
          <div className="bg-violet-500/20 p-3 rounded-lg w-max mb-4">
            <Sparkles className="h-6 w-6 text-violet-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("discover")}
          </p>
          <p className="text-sm md:text-lg text-gray-300/85">
            {t("discover-descp")}
          </p>
        </article>
        <article className="relative bg-slate-900/40 z-50 w-[350px] border-red-400/20 border-2 rounded-lg p-4 md:p-6">
          <div className="bg-red-500/20 p-3 rounded-lg w-max mb-4">
            <CircleAlert className="h-6 w-6 text-red-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-slate-100 mb-2">
            {t("important")}
          </p>
          <p className="text-sm md:text-[16px] text-gray-300/85">
            {t("warning-login")}
          </p>
        </article>
      </section>

      <div className="space-y-4 mb-8">
        <Link
          href="https://github.com/gixilym/lymbrarie"
          target="_blank"
          className="flex items-center justify-center gap-x-2 text-slate-400 hover:text-violet-300 transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[16px]">Lymbrarie {t("open-source")}</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>

        <Link
          target="_blank"
          href="https://github.com/gixilym/lymbrarie"
          className="fixed bottom-4 right-4 bg-slate-950/60 backdrop-blur-sm border border-violet-500/20 
            hover:border-violet-500/40 px-4 py-2 rounded-xl flex items-center gap-x-3 transition-all"
        >
          <GithubIcon className="w-5 h-5" />
          <span className="text-slate-300">{t("star")}</span>
          <StarIcon className="w-4 h-4 text-yellow-300" />
        </Link>
      </div>

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
