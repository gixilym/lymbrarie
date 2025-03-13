import AllPopups from "./AllPopups";
import Background from "./Background";
import FooterIndex from "./FooterIndex";
import HeaderIndex from "./HeaderIndex";
import IsOffline from "./alerts/IsOfflineAlert";
import JustClient from "./JustClient";
import { PAGES } from "@/utils/consts";
import { Toaster } from "react-hot-toast";
import { twJoin } from "tailwind-merge";
import { usePathname } from "next/navigation";
import "@fontsource/poppins";
import { type PropsWithChildren } from "react";
import { useUser, withUser, type User } from "next-firebase-auth";
import type { Component } from "@/utils/types";

export default withUser()(Layout);

function Layout({ children }: PropsWithChildren): Component {
  const user: User = useUser();
  const path: string = usePathname();

  return (
    <JustClient>
      <div
        className={twJoin(
          !path?.includes(PAGES.LOGIN) && "md:pt-6",
          "relative overflow-y-hidden overflow-x-hidden min-h-screen w-full bg-slate-950 font-mono flex flex-col justify-start items-center"
        )}
      >
        <IsOffline />
        <Toaster reverseOrder={false} position="top-right" />
        <HeaderIndex />
        {children}
        <Background />
        <AllPopups UID={user?.id as string} />
        {path != PAGES.LOGIN && <FooterIndex />}
      </div>
    </JustClient>
  );
}
