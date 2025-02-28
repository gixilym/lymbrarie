import Link from "next/link";
import { CroissantIcon, MenuIcon } from "lucide-react";
import { PAGES } from "@/utils/consts";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function Nav(): Component {
  const [t] = useTranslation("global");
  return (
    <nav className="absolute top-28 z-10 w-[200px] right-6 bg-slate-900 gap-y-1.5 p-4 rounded-xl flex-col items-start justify-center border border-violet-500/20 flex md:hidden text-slate-200">
      <Link href={PAGES.HOME}>&gt;&nbsp;&nbsp;{t("library")}</Link>
      <Link href={PAGES.SEARCH}>&gt;&nbsp;&nbsp;{t("book-finder")}</Link>
      <Link href={PAGES.PROFILE}>&gt;&nbsp;&nbsp;{t("profile")}</Link>
      <Link href={PAGES.CONFIG}>&gt;&nbsp;&nbsp;{t("settings")}</Link>
    </nav>
  );
}

function IconBtn({ menuIsOpen, setMenuIsOpen }: PropsBtn): Component {
  return (
    <button
      type="button"
      className="md:hidden text-violet-300 text-2xl"
      onClick={() => setMenuIsOpen(!menuIsOpen)}
    >
      {menuIsOpen ? (
        <CroissantIcon className="text-violet-200" size={24} />
      ) : (
        <MenuIcon className="text-violet-200" size={24} />
      )}
    </button>
  );
}

const Menu: MenuProps = {
  Nav,
  IconBtn,
};

export default Menu;

interface PropsBtn {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuProps {
  Nav: () => Component;
  IconBtn: ({ menuIsOpen, setMenuIsOpen }: PropsBtn) => Component;
}
