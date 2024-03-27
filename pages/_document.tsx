import Body from "@/components/Body";
import Providers from "@/components/Providers";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <Providers>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Providers>
    </Html>
  );
}
