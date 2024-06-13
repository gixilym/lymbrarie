"use client";
import type { Component } from "@/utils/types";
import DialogContainer from "../DialogContainer";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useEffect, useState } from "react";

function HardwareAccelerationPopUp(): Component {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [hardwareMsg, setHardwareMsg] = useLocalStorage("acceleration", "YES");

  useEffect(() => setIsClient(true), [hardwareMsg]);

  if (!isClient) return null;
  return (
    hardwareMsg == "YES" && (
      <DialogContainer divClass="!h-[200px] items-center justify-between mt-10">
        <p className="text-center sm:text-xl text-lg">
          Se recomienda activar la aceleración por hardware del navegador para
          una experiencia de usuario más fluida.
        </p>
        <button
          onClick={() => setHardwareMsg("NO")}
          className="bg-green-400 hover:bg-green-500 text-2xl text-black px-4 py-1 rounded-md w-max"
        >
          ok
        </button>
      </DialogContainer>
    )
  );
}

export default HardwareAccelerationPopUp;
