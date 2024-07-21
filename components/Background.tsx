import type { Component } from "@/utils/types";

function Background(): Component {
  return (
    <>
      <span className="fixed z-0 pointer-events-none right-0 h-[480px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <span className="fixed z-0 pointer-events-none right-14 top-10 h-[200px] opacity-60 w-[200px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <span className="fixed z-0 pointer-events-none -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <span className="fixed z-0 pointer-events-none -left-20 top-52 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
    </>
  );
}

export default Background;
