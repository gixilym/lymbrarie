import type { Component } from "@/utils/types";
import { useTranslation } from "react-i18next";
import { PaintRoller as PaintIcon } from "lucide-react";
function UnderMaintenance(): Component {
  const [t] = useTranslation("global");
  return (
    <div className="flex flex-col justify-center items-center gap-y-12 w-full pt-20 h-full">
      <PaintIcon size={90} />
      <h2 className="text-3xl md:text-5xl font-bold w-full text-center text-balance">
        {t("lymbrarie-is-under-maintenance")}
      </h2>
      <p className="text-lg md:text-2xl text-center text-pretty">
        {t("performing-maintenance-tasks")}
        <br /> <br />
        {t("please-come-back-later")}
      </p>
    </div>
  );
}

export default UnderMaintenance;
