import type { Component } from "@/utils/types";

function ModalTitle({ title }: { title: string }): Component {
  return (
    <h3 className="sm:text-2xl text-lg font-medium pb-1 text-white w-full">
      {title}
    </h3>
  );
}

export default ModalTitle;
