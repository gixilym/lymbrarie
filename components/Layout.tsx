import Background from "./Background";
import FooterIndex from "./FooterIndex";
import HeaderIndex from "./HeaderIndex";
import IsOffline from "./alerts/IsOfflineAlert";
import JustClient from "./JustClient";
import Popups from "@/components/Popups";
import useLocalStorage from "@/hooks/useLocalStorage";
import { PAGES } from "@/utils/consts";
import { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import "@fontsource/poppins";
import { type PropsWithChildren } from "react";
import { useUser, withUser, type User } from "next-firebase-auth";
import type { Component } from "@/utils/types";

export default withUser()(Layout);

function Layout({ children }: PropsWithChildren): Component {
  const user: User = useUser();
  const path: string = usePathname();
  const [circles] = useLocalStorage("circles", true);

  return (
    <JustClient>
      <div
        className={twMerge(
          path?.includes(PAGES.LOGIN) ? "pt-0" : "pt-6",
          "relative overflow-y-hidden overflow-x-hidden min-h-screen w-full bg-slate-950 font-mono flex flex-col justify-start items-center"
        )}
      >
        <IsOffline />
        <Toaster reverseOrder={false} position="top-right" />
        <HeaderIndex />
        {children}
        {circles && <Background />}
        <Popups UID={user?.id as string} />
        {path != PAGES.LOGIN && <FooterIndex />}
      </div>
    </JustClient>
  );
}
