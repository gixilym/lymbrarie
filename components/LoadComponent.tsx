import type { Component } from "@/utils/types";

function LoadComponent(): Component {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <span className="loading loading-spinner text-secondary w-14" />
    </div>
  );
}

export default LoadComponent;
