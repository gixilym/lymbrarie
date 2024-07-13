"use client";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";

function HardwareAccelerationPopUp(): Component {
  const [t] = useTranslation("global");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [hardwareMsg, setHardwareMsg] = useLocalStorage("acceleration", "YES");

  useEffect(() => setIsClient(true), [hardwareMsg]);

  if (!isClient) return <></>;

  return (
    hardwareMsg == "YES" && (
      <DialogContainer divClass="!h-[200px] items-center justify-between mt-10">
        <p className="text-center sm:text-xl text-lg text-pretty w-full max-w-[500px]">
          {t("hardware-msg")}
        </p>
        <button
          onClick={() => setHardwareMsg("NO")}
          className="bg-green-400 hover:bg-green-300 text-2xl text-black px-6 py-2 rounded-md w-max uppercase font-semibold"
        >
          ok
        </button>
      </DialogContainer>
    )
  );
}

export default HardwareAccelerationPopUp;
