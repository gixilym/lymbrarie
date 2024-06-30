import Providers from "@/components/Providers";
import "@/globals.css";
import { UNDER_MAINTENANCE } from "@/utils/helpers";
import type { Component } from "@/utils/types";
import "@fontsource-variable/public-sans";
import type { AppProps } from "next/app";
import { type NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps): Component {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (UNDER_MAINTENANCE && router.pathname != "/") {
      router.push("/");
    }
  }, [router]);

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
