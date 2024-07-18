import AppIcon from "@/components/AppIcon";
import I18Provider from "@/components/I18Provider";
import initAuth from "@/database/initAuth";
import "@/globals.css";
import { MAINTENANCE } from "@/utils/consts";
import type { Component } from "@/utils/types";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import Head from "next/head";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster as Notifications } from "react-hot-toast";
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
          <title>Lymbrarie</title>
        </Head>
        <AppIcon />
        <Notifications reverseOrder={false} position="top-right" />
        <Component {...pageProps} />
      </RecoilProvider>
    </I18Provider>
  );
}

export default App;
