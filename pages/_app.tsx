import I18Provider from "@/components/I18Provider";
import "@/globals.css";
import { MAINTENANCE } from "@/utils/consts";
import type { Component } from "@/utils/types";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot as RecoilProvider } from "recoil";
import initAuth from "@/database/initAuth";
import Head from "next/head";

initAuth();

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): Component {
  const { push, pathname }: NextRouter = useRouter();

  useEffect(() => {
    if (MAINTENANCE && pathname != "/") push("/");
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
