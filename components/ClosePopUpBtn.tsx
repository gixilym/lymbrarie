import usePopUp from "@/utils/hooks/usePopUp";
import type { Component, Ids } from "@/utils/types";
import { CircleX as CloseIcon } from "lucide-react";

function ClosePopUpBtn({ id }: { id: Ids }): Component {
  const { closePopUp } = usePopUp();

  return (
    <button
      type="button"
      onClick={() => closePopUp(id)}
      className="btn btn-ghost"
    >
      <CloseIcon size={38} />
    </button>
  );
}

export default ClosePopUpBtn;
