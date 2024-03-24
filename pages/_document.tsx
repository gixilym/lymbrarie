import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="backdrop-blur-4xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 font-mono w-full min-h-screen flex justify-center items-start relative pb-20 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
