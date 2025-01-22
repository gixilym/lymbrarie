import I18Provider from "@/components/I18Provider";
import Layout from "@/components/Layout";
import initAuth from "@/database/initAuth";
import "@/globals.css";
import type { Component } from "@/utils/types";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot as RecoilProvider } from "recoil";

initAuth();

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): Component {
  return (
    <I18Provider>
      <RecoilProvider>
        <Head>
          <link rel="manifest" href="/manifest.json" />
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
