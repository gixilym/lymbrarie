import type { Component } from "@/utils/types";
import "@fontsource/poppins";
import dynamic from "next/dynamic";
import { Toaster as Notifications } from "react-hot-toast";
import FooterIndex from "./FooterIndex";
// import PremiumBtn from "./btns/PremiumBtn";
import Background from "./Background";

const AppIcon = dynamic(() => import("@/components/AppIcon"), { ssr: false });

function Layout({ children }: { children: Component }): Component {
  return (
    <>
      <div className="relative overflow-x-hidden min-h-screen pt-10 w-full bg-slate-950 font-mono flex justify-center items-start">
        <Notifications reverseOrder={false} position="top-right" />
        <AppIcon />
        {/* <PremiumBtn /> */}
        <Background />
        {children}
        <FooterIndex />
      </div>
    </>
  );
}

export default Layout;
