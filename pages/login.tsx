import logo from "@/public/favicon.ico";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { GoogleIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { Ghost as GuestIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

function LoginPage(): Component {
  const { push, query }: NextRouter = useRouter(),
    book: string = (query.book as string) ?? "",
    ghost: string = (query.ghost as string) ?? "",
    [animations] = useLocalStorage("animations", true),
    [styles, animate] = useSpring(() => ({
      opacity: animations ? 0 : 1,
      config: { duration: 400 },
    }));

  useEffect(() => {
    if (animations) animate.start({ opacity: 1 });
  }, [animate]);

  return (
    <section className="absolute top-0 right-0 min-h-screen w-full flex items-start justify-center bg-transparent pt-16 sm:pt-24">
      <Head>
        <title>¡Bienvenido a Lymbrarie!</title>
      </Head>
      <animated.div
        style={styles}
        className="border-2 border-slate-700/70 py-14 sm:rounded-lg bg-slate-900 flex flex-col gap-y-14 justify-center items-center w-full max-w-[580px]"
      >
        <div className="w-full flex flex-col justify-start items-center gap-y-4">
          <Image
            className="w-20 h-20 border-2 border-slate-500/70 rounded-full"
            src={logo}
            alt="logo"
          />
          <h4 className="text-2xl sm:text-3xl tracking-tight font-pop w-full text-center">
            {book
              ? "¡Inicia sesión para añadir un libro!"
              : "¡Bienvenido a Lymbrarie!"}
          </h4>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-3.5">
          <button
            onClick={() => signIn("google", { callbackUrl: "/?guest=false" })}
            className="bg-slate-100/10 justify-center sm:justify-start sm:pl-12 hover:bg-slate-100/20
 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg border-2 border-slate-300/40 duration-150 "
          >
            <GoogleIcon className="w-8 h-8" />
            <p className="text-lg sm:text-xl text-white">
              Iniciar sesión con Google
            </p>
          </button>
          <button
            onClick={() => push("/?guest=true&ghost=true")}
            className="justify-center sm:justify-start pr-3 sm:pr-0 sm:pl-12
              bg-slate-100/10 flex items-center w-[330px] sm:w-full max-w-[400px] h-14 sm:h-[58px] gap-x-6 rounded-lg duration-150 hover:bg-blue-300/30"
          >
            <GuestIcon className="w-8 h-8" />
            <p className="text-lg sm:text-xl text-slate-100">
              {ghost ? "Seguir" : "Acceder"} como invitado
            </p>
          </button>
        </div>
      </animated.div>
    </section>
  );
}

export default LoginPage;
