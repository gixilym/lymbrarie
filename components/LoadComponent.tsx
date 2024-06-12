import type { Component } from "@/utils/types";

function LoadComponent(): Component {
  return (
    <div className="w-full h-full grid grid-place-content-center place-items-center">
      <span className="loading loading-spinner text-secondary w-14" />
    </div>
  );
}

export default LoadComponent;
