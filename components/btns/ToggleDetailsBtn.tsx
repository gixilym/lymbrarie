import type { Component } from "@/utils/types";
import { Rows3 as LayoutIcon, List as ListIcon } from "lucide-react";
import { MouseEventHandler } from "react";

const ListSVG = (): Component => (
  <svg
    className="mb-1.5 duration-300 cursor-pointer"
    viewBox="0 0 24 24"
    fill="none"
    width={30}
    height={30}
  >
    <ListIcon size={25} />
  </svg>
);

const LayoutSVG = (): Component => (
  <svg
    className="mt-1 duration-300 cursor-pointer"
    viewBox="0 0 24 24"
    fill="none"
    width={30}
    height={30}
  >
    <LayoutIcon size={22} />
  </svg>
);

function ToggleDetailsBtn({ showDetails, onClick }: Props): Component {
  return (
    <div className="btn btn-ghost btn-square" onClick={onClick}>
      {showDetails ? <LayoutSVG /> : <ListSVG />}
    </div>
  );
}

export default ToggleDetailsBtn;

interface Props {
  showDetails: boolean;
  onClick: MouseEventHandler;
}
