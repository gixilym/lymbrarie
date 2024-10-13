import { MAINTENANCE } from "@/utils/consts";
import type { Component } from "@/utils/types";
import "@fontsource/poppins";
import { Toaster as Notifications } from "react-hot-toast";
import Background from "./Background";
import FooterIndex from "./FooterIndex";
import IsOffline from "./IsOffline";
import Maintenance from "./Maintenance";

function Layout({ children }: { children: Component }): Component {
  return (
    <div className="relative overflow-x-hidden min-h-screen pt-10 w-full bg-slate-950 font-mono flex justify-center items-start">
      <IsOffline />
      {MAINTENANCE ? (
        <Maintenance />
      ) : (
        <>
          <Notifications reverseOrder={false} position="top-right" />
          {children}
          <FooterIndex />
        </>
      )}
      <Background />
    </div>
  );
}

export default Layout;
