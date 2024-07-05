import type { Component } from "@/utils/types";
import { OctagonAlert as Icon } from "lucide-react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function Error(): Component {
  const router: NextRouter = useRouter();
  const [t] = useTranslation("global");

  return (
    <div className="w-full min-h-screen justify-start items-center flex flex-col pt-10 gap-y-10">
      <Head>
        <title>Lymbrarie</title>
      </Head>
      <div className="w-full justify-center items-center flex">
        <Icon size={100} />
      </div>
      <p className="text-4xl tracking-tight font-bold lg:text-6xl text-center">
        Error 505
      </p>
      <p className="text-xl md:text-2xl text-center w-full max-w-[700px] text-pretty px-2 md:px-0">
        {t(router.query.err ?? "")}
      </p>
      <address className="text-xl md:text-2xl text-center w-full font-bold">
        gixipixel@gmail.com
      </address>
    </div>
  );
}

export default Error;
