import SearchMain from "@/components/SearchMain";
import useSessionExists from "@/utils/hooks/useSessionExists";
import type { Component } from "@/utils/types";
import LogInBtn from "./btns/LogInBtn";
import HardwareAccelerationPopUp from "./popups/HardwareAccelerationPopUp";

function HeaderMain(): Component {
  const { userLoggedIn } = useSessionExists();

  return (
    <header className="z-10 w-full px-4 sm:px-0 justify-center items-center flex-col flex h-26 ">
      <SearchMain />
      {userLoggedIn ? (
        <div className="hidden sm:block divider px-40" />
      ) : (
        <LogInBtn inHeader />
      )}
      <HardwareAccelerationPopUp />
    </header>
  );
}

export default HeaderMain;
