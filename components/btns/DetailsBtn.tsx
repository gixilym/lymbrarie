import useLocalStorage from "@/hooks/useLocalStorage";
import { animateList } from "@/utils/store";
import { LayoutIcon, ListIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function DetailsBtn({ showDetails, onClick }: Props): Component {
  const [t] = useTranslation("global");
  const [animations] = useLocalStorage("animations", true);
  const [animate, setAnimate] = useRecoilState<boolean>(animateList);

  return (
    <div
      title={t("layout")}
      className="btn btn-ghost btn-square"
      onClick={e => {
        onClick(e);
        if (animations) setAnimate(!animate);
      }}
    >
      {showDetails ? <LayoutIcon /> : <ListIcon />}
    </div>
  );
}

export default DetailsBtn;

interface Props {
  showDetails: boolean;
  onClick: MouseEventHandler;
}
