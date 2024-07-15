import type { Component } from "@/utils/types";
import { OctagonAlert as Icon } from "lucide-react";
import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ErrorPage(): Component {
  const router: NextRouter = useRouter();
  const [t] = useTranslation("global");

  return (
    <div className="w-full min-h-screen justify-start items-center flex flex-col pt-10 gap-y-10">
      <div className="w-full justify-center items-center flex">
        <Icon size={100} />
      </div>
      <p className="text-4xl tracking-tight font-bold lg:text-6xl text-center">
        Error 505
      </p>
      <p className="text-xl md:text-2xl text-center w-full max-w-[650px] text-pretty px-2 md:px-0">
        {t(router.query.err ?? "")}
      </p>
      <address className="text-xl md:text-2xl text-center w-full font-bold">
        gixi.tsx@gmail.com
      </address>
      <Link
        href="/"
        className="text-2xl sm:text-3xl underline w-full text-center"
      >
        Recargar
      </Link>
    </div>
  );
}

export default ErrorPage;
