import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/components/Providers";

//! Escuchar datos sin conexión: https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=es&authuser=2

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
