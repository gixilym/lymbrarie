import { LayoutIcon, ListIcon } from "@/utils/svgs";
import type { Component } from "@/utils/types";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

function DetailsBtn({ showDetails, onClick }: Props): Component {
  const [t] = useTranslation("global");
  return (
    <div
      title={t("layout")}
      className="btn btn-ghost btn-square"
      onClick={onClick}
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
