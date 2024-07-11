import SearchMain from "@/components/SearchMain";
import type { Component } from "@/utils/types";
import LogInBtn from "./btns/LogInBtn";
import JustIsSpace from "./JustIsSpace";
import HardwareAccelerationPopUp from "./popups/HardwareAccelerationPopUp";

function HeaderIndex({ isLogged }: { isLogged: boolean }): Component {
  return (
    <header className="z-10 w-full px-4 sm:px-0 justify-center items-center flex-col flex h-26 ">
      <SearchMain isLogged={isLogged} />
      {isLogged ? <JustIsSpace /> : <LogInBtn />}
      <HardwareAccelerationPopUp />
    </header>
  );
}

export default HeaderIndex;
