import "@/styles/globals.css";
import "@fontsource-variable/public-sans";
import type { AppProps } from "next/app";
import type { Component } from "@/utils/types";
import Providers from "@/components/Providers";

export default function App({ Component, pageProps }: AppProps): Component {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
