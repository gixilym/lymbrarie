import I18Provider from "@/components/I18Provider";
import "@/globals.css";
import { MAINTENANCE } from "@/utils/consts";
import type { Component } from "@/utils/types";
import "@fontsource-variable/public-sans";
import "@fontsource/poppins";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot as RecoilProvider } from "recoil";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): Component {
  const { push, pathname }: NextRouter = useRouter();

  useEffect(() => {
    if (MAINTENANCE && pathname != "/") push("/");
  }, [pathname]);

  return (
    <SessionProvider
      session={session}
      basePath="/api/auth"
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <I18Provider>
        <RecoilProvider>
          <Component {...pageProps} />
        </RecoilProvider>
      </I18Provider>
    </SessionProvider>
  );
}

export default App;
