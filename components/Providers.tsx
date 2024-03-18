"use client";
import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

function Providers({ children }: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default Providers;
