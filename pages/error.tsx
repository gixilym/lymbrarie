import ErrorNotes from "@/components/ErrorNotes";
import useLocalStorage from "@/hooks/useLocalStorage";
import { clearStorage } from "@/utils/helpers";
import type { Component } from "@/utils/types";
import { OctagonAlert as Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ErrorPage(): Component {
  const [t] = useTranslation("global"),
    notes: string | undefined = useRouter()?.query?.notes?.toString(),
    [, setAcceleration] = useLocalStorage("acceleration", false),
    [lang, setLang] = useLocalStorage("language", "en"),
    [state, setState] = useLocalStorage("state", true),
    [animations, setAnimations] = useLocalStorage("animations", true);

  function clearData(): void {
    clearStorage();
    setAcceleration(false);
    setLang(lang);
    setAnimations(animations);
    setState(state);
  }

  if (notes) return <ErrorNotes notes={notes} />;

  return (
    <section className="w-full h-full justify-start items-center flex flex-col pt-10 gap-y-10">
      <div className="w-full justify-center items-center flex">
        <Icon size={90} />
      </div>
      <div className="flex flex-col justify-start items-center gap-y-6">
        <span className="text-3xl tracking-tight font-bold lg:text-5xl text-center uppercase">
          Error
        </span>
        <p className="text-xl md:text-2xl text-center w-full max-w-[650px] text-pretty px-2 md:px-0">
          {t("unknown")}
        </p>
      </div>
      <address className="text-xl md:text-2xl text-center w-full font-bold text-blue-400 hover:text-blue-300 duration-75 ">
        <a href="mailto:gixi.tsx@gmail.com">gixi.tsx@gmail.com</a>
      </address>
      <Link
        href="/"
        onClick={clearData}
        className="text-2xl sm:text-3xl underline w-full text-center lowercase hover:text-slate-300 duration-75">
        {t("reload")}
      </Link>
    </section>
  );
}

export default ErrorPage;
