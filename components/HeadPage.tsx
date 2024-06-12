import type { Component } from "@/utils/types";
import Head from "next/head";

function HeadPage(): Component {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="description" content="Donde cada libro encuentra su lugar" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Lymbrarie</title>
    </Head>
  );
}

export default HeadPage;
