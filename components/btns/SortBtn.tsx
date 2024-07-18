import type { Component } from "@/utils/types";
import { isNull } from "es-toolkit";
import {
  Shuffle as ShuffleIcon,
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

function SortBtn({ alternateSort, ascToDesc }: Props): Component {
  const [t] = useTranslation("global");
  return (
    <button
      title={t("order")}
      onClick={alternateSort}
      className="btn btn-ghost btn-square"
    >
      {ascToDesc && <SortAZIcon size={29} />}
      {ascToDesc === false && <SortZAIcon size={29} />}
      {isNull(ascToDesc) && <ShuffleIcon size={27} />}
    </button>
  );
}

export default SortBtn;

interface Props {
  ascToDesc: boolean | null;
  alternateSort: MouseEventHandler<HTMLButtonElement>;
}
