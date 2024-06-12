"use client ";
import SearchMain from "@/components/SearchMain";
import useSessionExists from "@/utils/hooks/useSessionExists";
import type { Component } from "@/utils/types";
import LogInBtn from "./LogInBtn";
import { Toaster as ToastNotification } from "react-hot-toast";
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

      <ToastNotification reverseOrder={false} position="top-right" />
    </header>
  );
}

export default HeaderMain;
