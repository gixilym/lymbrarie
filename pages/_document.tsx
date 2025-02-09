import Providers from "@/components/I18Provider";
import type { Component } from "@/utils/types";
import { Head, Html, Main, NextScript } from "next/document";

function Document(): Component {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Lymbrarie - Tu biblioteca personal" />
        <meta
          name="description"
          content="La mejor forma de gestionar tu biblioteca"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lymbrarie.com/" />
        <meta
          property="og:title"
          content="Lymbrarie - Tu biblioteca personal"
        />
        <meta
          property="og:description"
          content="La mejor forma de gestionar tu biblioteca"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dgs55s8qh/image/upload/v1721421179/uyp9sym1kgwcbbt3z07r.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lymbrarie.com/" />
        <meta
          property="twitter:title"
          content="Lymbrarie - Tu biblioteca personal"
        />
        <meta
          property="twitter:description"
          content="La mejor forma de gestionar tu biblioteca"
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/dgs55s8qh/image/upload/v1721421179/uyp9sym1kgwcbbt3z07r.png"
        />
      </Head>
      <Providers>
        <Main />
        <NextScript />
      </Providers>
    </Html>
  );
}

export default Document;
