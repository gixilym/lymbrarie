import { Head, Html, Main, NextScript } from "next/document";
import Body from "@/components/Body";
import Providers from "@/components/Providers";
import type { Component } from "@/utils/types";

export default function Document(): Component {
  return (
    <Html lang="es">
      <Head />
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="description" content="Donde cada libro encuentra su lugar" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Lymbrarie</title>

      <Providers>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Providers>
    </Html>
  );
}
