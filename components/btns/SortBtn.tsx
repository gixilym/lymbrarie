import type { Component } from "@/utils/types";
import {
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";

function SortBtn({ alternateSort, atoz }: Props): Component {
  return (
    <div onClick={alternateSort} className="btn btn-ghost btn-square">
      {atoz ? <SortZAIcon size={29} /> : <SortAZIcon size={29} />}
    </div>
  );
}

export default SortBtn;

interface Props {
  atoz: boolean;
  alternateSort: MouseEventHandler<HTMLDivElement> | undefined;
}
