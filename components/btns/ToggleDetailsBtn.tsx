import { LayoutIcon, ListIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

function ToggleDetailsBtn({ showDetails, onClick }: Props): Component {
  return (
    <div
      className={twMerge(
        showDetails ? "pt-1" : "pt-2.5",
        "btn btn-ghost btn-square"
      )}
      onClick={onClick}
    >
      {showDetails ? <LayoutIcon /> : <ListIcon />}
    </div>
  );
}

export default ToggleDetailsBtn;

interface Props {
  showDetails: boolean;
  onClick: MouseEventHandler;
}
