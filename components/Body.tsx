import type { Component } from "@/utils/types";
import type { PropsWithChildren } from "react";

function Body({ children }: PropsWithChildren): Component {
  return (
    <body className="relative overflow-x-hidden min-h-screen pt-10 w-full bg-slate-950 font-mono flex justify-center items-start z-[-2]">
      {children}
      <div className="absolute z-[-1] right-0 h-[480px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute z-[-1] -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
    </body>
  );
}

export default Body;
