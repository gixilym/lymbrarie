import LoaderCircle from "@/components/LoaderCircle";
import useLocalStorage from "@/hooks/useLocalStorage";
import logo from "@/public/favicon.ico";
import { clearStorage } from "@/utils/helpers";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { type Auth, getAuth } from "firebase/auth";
import { AuthAction, withUser } from "next-firebase-auth";
import Image from "next/image";
import { type NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: LoaderCircle,
})(LogoutPage);

function LogoutPage(): Component {
  const auth: Auth = getAuth(),
    [, setAcceleration] = useLocalStorage("acceleration", false),
    [lang, setLang] = useLocalStorage("language", "en"),
    [animations, setAnimations] = useLocalStorage("animations", true),
    [state, setState] = useLocalStorage("state", true),
    router: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  function forgetSession(): void {
    clearStorage();
    setAcceleration(false);
    setLang(lang);
    setAnimations(animations);
    setState(state);
    auth.signOut();
  }

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex items-start justify-center bg-transparent sm:pt-24">
      <animated.div
        style={styles}
        className="border-0 sm:border-2 border-slate-700/70 py-14 sm:rounded-lg bg-slate-900 flex flex-col gap-y-14 justify-start items-center w-full min-h-screen sm:min-h-min max-w-[580px]">
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
            className="bg-red-800/90 justify-center hover:bg-red-700 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg border-2 border-red-300/40 duration-150 ">
            <p className="text-lg sm:text-xl text-white">{t("logout")}</p>
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-slate-100/10 flex items-center justify-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg duration-150 hover:bg-blue-300/30">
            <p className="text-lg sm:text-xl text-slate-100">{t("cancel")}</p>
          </button>
        </div>
      </animated.div>
    </section>
  );
}
