import Favicon from "@/public/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import useGuest from "@/hooks/useGuest";
import { animated, useSpring } from "@react-spring/web";
import { animateOpacity, pathIs } from "@/utils/helpers";
import { menuAtom, scrollAtom } from "@/utils/atoms";
import { PAGES } from "@/utils/consts";
import { twJoin, twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Component, SetState } from "@/utils/types";
import {
  LibraryIcon,
  SearchIcon,
  UserIcon,
  Settings2 as ConfigIcon,
} from "lucide-react";

function HeaderIndex(): Component {
  const { isGuest } = useGuest(),
    [t] = useTranslation("global"),
    [menuIsOpen, setMenuIsOpen] = useRecoilState(menuAtom),
    [styles] = useSpring(() => animateOpacity(1, 400, 600)),
    setScroll: SetState = useSetRecoilState(scrollAtom);

  useEffect(() => setMenuIsOpen(false), [location.pathname]);

  if (pathIs(PAGES.LOGIN, { exact: true })) return <></>;

  return (
    <>
      <animated.header
        style={styles}
        className={twMerge(
          menuIsOpen && pathIs(PAGES.HOME, { exact: true })
            ? "mb-28"
            : "mb-10 md:mb-20",
          "navbar max-w-[1000px] bg-slate-900/80 backdrop-blur-sm md:rounded-2xl px-6 border-b md:border border-violet-500/20 justify-between"
        )}
      >
        <Link
          href={isGuest ? PAGES.GUEST : PAGES.HOME}
          className="flex items-center justify-start gap-x-3 w-max hover:opacity-90 transition-opacity cursor-default"
        >
          <div className="bg-violet-500/20 p-0.5 rounded-full">
            <Image
              src={Favicon.src}
              width={33}
              height={33}
              alt="logo"
              className="text-violet-400"
            />
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-violet-50 via-violet-100 to-violet-200 text-transparent bg-clip-text">
            Lymbrarie
          </p>
        </Link>

        <nav className="hidden md:flex items-center gap-x-2">
          <Link
            href={isGuest ? PAGES.GUEST : PAGES.HOME}
            className={twMerge(
              pathIs(PAGES.HOME, { exact: true })
                ? "bg-violet-500/15 text-violet-200"
                : "text-slate-300",
              "px-4 py-2 rounded-xl transition-colors hover:bg-violet-500/15 flex items-center gap-x-2"
            )}
          >
            <LibraryIcon
              className={twJoin(
                "w-5 h-5",
                pathIs(PAGES.HOME, { exact: true }) && "text-violet-300/80"
              )}
            />
            {t("library")}
          </Link>
          <Link
            onClick={() => setScroll(0)}
            href={PAGES.SEARCH}
            className={twMerge(
              pathIs(PAGES.SEARCH)
                ? "bg-violet-500/20 text-violet-200"
                : "text-slate-300",
              "px-4 py-2 rounded-xl transition-colors hover:bg-violet-500/20 flex items-center gap-x-2"
            )}
          >
            <SearchIcon
              className={twJoin(
                "w-5 h-5",
                pathIs(PAGES.SEARCH) && "text-violet-300/80"
              )}
            />
            {t("book-finder")}
          </Link>
          {/* 
          <Link
            onClick={() => setScroll(0)}
            href={PAGES.WRITER}
            className={twMerge(
              pathIs(PAGES.WRITER)
                ? "bg-violet-500/20 text-violet-200"
                : "text-slate-300",
              "px-4 py-2 rounded-xl transition-colors hover:bg-violet-500/20 flex items-center gap-x-2"
            )}
          >
            <BookOpenIcon
              className={twJoin(
                "w-5 h-5 mt-0.5",
                pathIs(PAGES.WRITER) && "text-violet-300/80"
              )}
            />
            {t("writer")}
          </Link> */}
          <Link
            onClick={() => setScroll(0)}
            href={PAGES.PROFILE}
            className={twMerge(
              pathIs(PAGES.PROFILE)
                ? "bg-violet-500/20 text-violet-200"
                : "text-slate-300",
              "px-4 py-2 rounded-xl transition-colors hover:bg-violet-500/20 flex items-center gap-x-2"
            )}
          >
            <UserIcon
              className={twJoin(
                "w-5 h-5",
                pathIs(PAGES.PROFILE) && "text-violet-300/80"
              )}
            />
            {t("profile")}
          </Link>
          <Link
            onClick={() => setScroll(0)}
            href={PAGES.CONFIG}
            className={twMerge(
              pathIs(PAGES.CONFIG)
                ? "bg-violet-500/20 text-violet-200"
                : "text-slate-300",
              "px-4 py-2 rounded-xl transition-colors hover:bg-violet-500/20 flex items-center gap-x-2"
            )}
          >
            <ConfigIcon
              className={twJoin(
                "w-5 h-5",
                pathIs(PAGES.CONFIG) && "text-violet-300/80"
              )}
            />
            {t("settings")}
          </Link>
        </nav>

        <Menu.IconBtn menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      </animated.header>
      {menuIsOpen && <Menu.Nav />}
    </>
  );
}

export default HeaderIndex;
