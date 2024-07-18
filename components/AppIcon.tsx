import icon from "@/public/favicon.ico";
import type { Component } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

function AppIcon(): Component {
  return (
    <Link
      href="/"
      title="Lymbrarie"
      className="hidden sm:flex px-3.5 py-2 rounded-full cursor-default justify-between items-center bg-purple-700/10 fixed top-5 left-5 gap-x-3"
    >
      <Image src={icon} width={35} height={35} alt="logo" />
      <p className="text-xl text-purple-200/90">Lymbrarie</p>
    </Link>
  );
}

export default AppIcon;
