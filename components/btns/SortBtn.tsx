import useLocalStorage from "@/hooks/useLocalStorage";
import { animListAtom } from "@/utils/atoms";
import { isNull } from "es-toolkit";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import {
  Shuffle as ShuffleIcon,
  ArrowDownAZ as SortAZIcon,
  ArrowDownZA as SortZAIcon,
} from "lucide-react";

function SortBtn(props: Props): Component {
  const { toggleSort, ascToDesc } = props,
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [animate, setAnimate] = useRecoilState<boolean>(animListAtom);

  return (
    <button
      title={t("order")}
      className="btn btn-ghost btn-square"
      onClick={() => {
        toggleSort();
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
  toggleSort: () => void;
}
