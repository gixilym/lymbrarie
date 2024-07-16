import { LayoutIcon, ListIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import type { MouseEventHandler } from "react";

function DetailsBtn({ showDetails, onClick }: Props): Component {
  return (
    <div className="btn btn-ghost btn-square" onClick={onClick}>
      {showDetails ? <LayoutIcon /> : <ListIcon />}
    </div>
  );
}

export default DetailsBtn;

interface Props {
  showDetails: boolean;
  onClick: MouseEventHandler;
}
