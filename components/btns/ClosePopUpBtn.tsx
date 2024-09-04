import usePopUp from "@/hooks/usePopUp";
import type { Component, PopUpsIds } from "@/utils/types";
import { CircleX as Icon } from "lucide-react";

function ClosePopUpBtn({ id }: { id: PopUpsIds }): Component {
  const { closePopUp } = usePopUp();

  return (
    <button
      type="button"
      onClick={() => closePopUp(id)}
      className="btn btn-ghost btn-square w-12 h-12 rounded-full backdrop-blur-xl absolute top-3.5 right-3"
    >
      <Icon size={38} />
    </button>
  );
}

export default ClosePopUpBtn;
