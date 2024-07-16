import type { Component } from "@/utils/types";
import {
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";

function SortBtn({ alternateSort, ascToDesc }: Props): Component {
  return (
    <button onClick={alternateSort} className="btn btn-ghost btn-square">
      {ascToDesc && <SortAZIcon size={29} />}
      {ascToDesc === false && <SortZAIcon size={29} />}
      {/* {isNull(ascToDesc) && <ShuffleIcon size={27} />} */}
    </button>
  );
}

export default SortBtn;

interface Props {
  ascToDesc: boolean | null;
  alternateSort: MouseEventHandler<HTMLButtonElement>;
}
