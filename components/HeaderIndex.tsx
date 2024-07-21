import SearchIndex from "@/components/SearchIndex";
import type { Component } from "@/utils/types";
import AccelerationPopUp from "./popups/AccelerationPopUp";
// import Sync from "./Sync";

function HeaderIndex(): Component {
  return (
    <header className="z-10 w-full mb-6 sm:mb-10 justify-center items-center flex h-26">
      <SearchIndex />
      <AccelerationPopUp />
      {/* <Sync /> */}
    </header>
  );
}

export default HeaderIndex;
