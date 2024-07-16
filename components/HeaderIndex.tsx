import SearchIndex from "@/components/SearchIndex";
import type { Component } from "@/utils/types";
import HardwareAccelerationPopUp from "./popups/HardwareAccelerationPopUp";

function HeaderIndex(): Component {
  return (
    <header className="z-10 w-full mb-6 sm:mb-10 justify-center items-center flex h-26">
      <SearchIndex />
      <HardwareAccelerationPopUp />
    </header>
  );
}

export default HeaderIndex;
