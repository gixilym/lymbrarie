import useLocalStorage from "@/hooks/useLocalStorage";
import { animateList } from "@/utils/store";
import type { Component } from "@/utils/types";
import { isNull } from "es-toolkit";
import {
  Shuffle as ShuffleIcon,
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function SortBtn({ alternateSort, ascToDesc }: Props): Component {
  const [t] = useTranslation("global");
  const [animations] = useLocalStorage("animations", true);
  const [animate, setAnimate] = useRecoilState<boolean>(animateList);

  return (
    <button
      title={t("order")}
      className="btn btn-ghost btn-square"
      onClick={e => {
        alternateSort(e);
        if (animations) setAnimate(!animate);
      }}
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
