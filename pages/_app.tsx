import I18Provider from "@/components/I18Provider";
import Layout from "@/components/Layout";
import initAuth from "@/database/initAuth";
import "@/globals.css";
import { MAINTENANCE } from "@/utils/consts";
import type { Component } from "@/utils/types";
import type { AppProps } from "next/app";
import Head from "next/head";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot as RecoilProvider } from "recoil";

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
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          <title translate="no">Lymbrarie</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilProvider>
    </I18Provider>
  );
}

export default App;
