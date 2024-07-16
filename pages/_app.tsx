import I18Provider from "@/components/I18Provider";
import initAuth from "@/database/initAuth";
import "@/globals.css";
import type { Component } from "@/utils/types";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import Head from "next/head";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot as RecoilProvider } from "recoil";

const maintenance: boolean = JSON.parse(
  process.env.NEXT_PUBLIC_MAINTENANCE as string
);

initAuth();

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): Component {
  const { push, pathname }: NextRouter = useRouter();

  useEffect(() => {
    if (maintenance && pathname != "/") push("/");
  }, [pathname]);

  return (
    <I18Provider>
      <RecoilProvider>
        <Head>
          <title>Lymbrarie</title>
        </Head>
        <Component {...pageProps} />
      </RecoilProvider>
    </I18Provider>
  );
}

export default App;
