import AppIcon from "@/components/AppIcon";
import BackBtn from "@/components/btns/BackBtn";
import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Image from "next/image";
import LogInPopUp from "@/components/popups/LogInPopUp";
import NotesPopUp from "@/components/popups/NotesPopUp";
import SettingsBtn from "@/components/btns/SettingsBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { animated, useSpring } from "@react-spring/web";
import { popupsAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";
import {
  Trash as DeleteIcon,
  SquarePen as EditIcon,
  BookmarkCheck as FavoriteIcon,
  Library as LibraryIcon,
  Notebook as NotesIcon,
  Tag as StateIcon,
  User as UserIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

function Page0(): Component {
  const { openPopUp } = usePopUp(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    Cover: any = animated(Image),
    [notes, setNotes] = useState<string>(t("notes-book-0")),
    [isMobile, setIsMobile] = useState<boolean>(false),
    notesProps = {
      notes,
      setNotes,
      isLoading: false,
      loadingFav: false,
      updateNotes: () => {},
      isGuest: true,
    },
    [popup] = useRecoilState<any>(popupsAtom),
    [stylesImg] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      delay: 200,
      config: { duration: 200 },
    })),
    [stylesIcons] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    })),
    [stylesSection] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 500 },
    }));

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <animated.section
      style={stylesSection}
      className="flex flex-col justify-center items-center w-full gap-y-6 sm:pb-10 sm:pt-10 h-full sm:pl-20 sm:mb-20 sm:mt-8"
    >
      <Head>
        <title translate="no">{t("name-book-0")}</title>
      </Head>
      <div
        className={twMerge(
          isMobile ? "hidden" : "hidden md:block",
          "absolute top-10 left-4"
        )}
      >
        <AppIcon />
      </div>
      {popup.login && <LogInPopUp />}
      {popup.notes && <NotesPopUp {...notesProps} />}

      <BackBtn hidden isGuest />
      <Breadcrumbs isGuest />
      <article
        id="screenshot"
        className="w-full sm:w-[700px] h-[290px] flex flex-col sm:flex-row gap-y-12 justify-start items-center sm:items-start backdrop-blur-[2.5px] relative mt-20 xl:mt-0 sm:mt-12"
      >
        <Cover
          priority
          style={stylesImg}
          className="select-none aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-md"
          src={t("cover-book-0")}
          width={200}
          height={300}
          alt="cover"
        />

        <div className="flex flex-col justify-between items-start w-[100vw] sm:w-full max-w-[500px] sm:h-full px-10 sm:px-4 pb-2.5">
          <div className="flex flex-col justify-start items-start w-full h-full gap-y-2">
            <p className="text-xl sm:text-[28px] font-bold tracking-wide sm:min-h-20 h-auto overflow-ellipsis overflow-hidden whitespace-wrap w-full">
              {t("name-book-0")}
            </p>

            <div className="flex flex-row justify-start items-center gap-x-2 w-full">
              <UserIcon size={18} />
              <p className="text-sm sm:text-[16px] overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                Dan Brown
              </p>
            </div>

            <div className="flex flex-row justify-start items-center gap-x-2 w-full">
              <StateIcon size={18} />
              <p className="text-sm sm:text-[16px] capitalize overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                {t("gender-book-0")}
              </p>
            </div>

            <div className="flex flex-row justify-start items-center gap-x-2 w-full">
              <LibraryIcon size={18} />
              <p className="text-sm sm:text-[16px] overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                {t("new-book-reading")}
              </p>
            </div>
          </div>
          <animated.div
            id="icons"
            style={stylesIcons}
            className="flex items-center justify-center gap-x-2"
          >
            <button
              onClick={() => openPopUp("notes")}
              className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mt-4 sm:mt-0 mb-1"
            >
              <NotesIcon className="w-6 h-6 sm:w-7 sm:h-8" />
            </button>
            <div className="dropdown dropdown-top dropdown-right opacity-100 flex sm:block items-end justify-center">
              <SettingsBtn />
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-[240px]"
              >
                <li onClick={() => openPopUp("login")}>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <FavoriteIcon size={18} />
                    <p>{t("add-fav")}</p>
                  </div>
                </li>

                <li className="py-1.5" onClick={() => openPopUp("login")}>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <EditIcon size={18} />
                    <p>{t("edit-book")}</p>
                  </div>
                </li>

                <li onClick={() => openPopUp("login")}>
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <DeleteIcon size={18} />
                    <p>{t("delete-book")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </animated.div>
        </div>
      </article>
    </animated.section>
  );
}

export default Page0;
