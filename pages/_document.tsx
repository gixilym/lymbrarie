import Body from "@/components/Body";
import Providers from "@/components/I18Provider";
import type { Component } from "@/utils/types";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document(): Component {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <Providers>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Providers>
    </Html>
  );
}
