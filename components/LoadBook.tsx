import type { Component } from "@/utils/types";

function LoadBook(): Component {
  return (
    <div className="mt-20 w-full h-full flex justify-center items-start opacity-80">
      <span className="loading loading-spinner text-secondary w-14" />
    </div>
  );
}

export default LoadBook;
