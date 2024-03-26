import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/Providers";
import "@fontsource-variable/public-sans";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
