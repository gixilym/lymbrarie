import type { Component } from "@/utils/types";

function HeaderPopUp({ title, icon }: Props): Component {
  return (
    <div className="w-full flex justify-start items-center gap-x-4 text-slate-100">
      {icon}
      <h3 className="sm:text-2xl text-lg font-medium w-full">{title}</h3>
    </div>
  );
}

export default HeaderPopUp;

interface Props {
  title: string;
  icon: Component;
}
