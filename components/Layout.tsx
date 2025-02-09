import Background from "./Background";
import FooterIndex from "./FooterIndex";
import IsOffline from "./IsOffline";
import { Toaster as Notifications } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import "@fontsource/poppins";
import type { Component } from "@/utils/types";
import { useEffect, useState } from "react";

function Layout({ children }: Props): Component {
  const path: string = usePathname();
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => setLoad(true), []);

  if (!load) return <></>;

  return (
    <div
      className={twMerge(
        path?.includes("/login") ? "pt-0" : "pt-10",
        "relative overflow-y-hidden overflow-x-hidden min-h-screen w-full bg-slate-950 font-mono flex flex-col justify-start items-center"
      )}
    >
      <IsOffline />
      <Notifications reverseOrder={false} position="top-right" />
      {children}
      {path == "/login" || path == "/" ? <></> : <FooterIndex />}
      <Background />
    </div>
  );
}

export default Layout;

type Props = { children: Component };
