import type { Component } from "@/utils/types";

function LoaderCircle(): Component {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-start pt-20 justify-center z-[999] bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950">
      <span className="loading loading-spinner text-secondary w-14" />
    </div>
  );
}

export default LoaderCircle;
