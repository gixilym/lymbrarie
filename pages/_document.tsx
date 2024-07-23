import Providers from "@/components/I18Provider";
import type { Component } from "@/utils/types";
import { Head, Html, Main, NextScript } from "next/document";

function Document(): Component {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Lymbrarie" />
        <meta
          name="description"
          content="donde cada libro encuentra su lugar"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lymbrarie.com/" />
        <meta property="og:title" content="Lymbrarie" />
        <meta
          property="og:description"
          content="donde cada libro encuentra su lugar"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dgs55s8qh/image/upload/v1721421179/uyp9sym1kgwcbbt3z07r.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lymbrarie.com/" />
        <meta property="twitter:title" content="Lymbrarie" />
        <meta
          property="twitter:description"
          content="donde cada libro encuentra su lugar"
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/dgs55s8qh/image/upload/v1721421179/uyp9sym1kgwcbbt3z07r.png"
        />
        <meta name="google-adsense-account" content="ca-pub-6333479205921641" />
      </Head>
      <Providers>
        <Main />
        <NextScript />
      </Providers>
    </Html>
  );
}

export default Document;
