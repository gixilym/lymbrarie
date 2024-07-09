import type { Component } from "@/utils/types";
import {
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";

function SortBtn({ alternateSort, atoz }: any): Component {
  return (
    <div onClick={alternateSort} className="btn btn-ghost btn-square">
      {atoz ? <SortAZIcon size={29} /> : <SortZAIcon size={29} />}
    </div>
  );
}

export default SortBtn;
