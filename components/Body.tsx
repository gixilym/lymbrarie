import type { Component, PropsWithChildren } from "@/utils/types";

function Body({ children }: PropsWithChildren): Component {
  return (
    <body className="relative min-h-screen pt-10 w-full bg-slate-950 font-mono flex justify-center items-start z-[-2]">
      {children}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1]" />
      <div className="absolute z-[-1] right-0 h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute z-[-1] -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
    </body>
  );
}

export default Body;
