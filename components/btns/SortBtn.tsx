import type { Component } from "@/utils/types";
import {
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";

function SortBtn({ alternateSort, ascToDesc }: Props): Component {
  return (
    <button onClick={alternateSort} className="btn btn-ghost btn-square">
      {ascToDesc ? <SortAZIcon size={29} /> : <SortZAIcon size={29} />}
    </button>
  );
}

export default SortBtn;

interface Props {
  ascToDesc: boolean;
  alternateSort: MouseEventHandler<HTMLButtonElement>;
}
