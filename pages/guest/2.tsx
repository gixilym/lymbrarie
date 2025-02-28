import Head from "next/head";
import Image from "next/image";
import LogInPopUp from "@/components/popups/LogInPopUp";
import NotesPopUp from "@/components/popups/NotesPopUp";
import SettingsBtn from "@/components/btns/SettingsBtn";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { animated, useSpring } from "@react-spring/web";
import { popupsAtom } from "@/utils/atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
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
import BackBtn from "@/components/btns/BackBtn";

function GuestPage2(): Component {
  const { openPopUp } = usePopUp(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    Cover: any = animated(Image),
    [notes, setNotes] = useState<string>(t("notes-book-2")),
    notesProps = {
      notes,
      setNotes,
      isLoading: false,
      loadingFav: false,
      isGuest: true,
      updateNotes: () => {},
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

  return (
    <animated.section
      style={stylesSection}
      className="flex flex-col justify-start items-center w-full relative"
    >
      <Head>
        <title translate="no">{t("name-book-2")}</title>
      </Head>

      {popup.login && <LogInPopUp />}
      {popup.notes && <NotesPopUp {...notesProps} />}

      <BackBtn />

      <article
        id="screenshot"
        className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-sm border border-violet-500/20 
          md:rounded-2xl p-8 flex flex-col sm:flex-row gap-8 relative items-center justify-center"
      >
        <div className="flex-shrink-0">
          <div className="md:bg-violet-500/10 p-1.5 rounded-xl">
            <Cover
              priority
              style={stylesImg}
              className="select-none w-[200px] h-[300px] aspect-[2/3] rounded-lg object-cover"
              src={t("cover-book-2")}
              width={200}
              height={300}
              alt="cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-y-6">
          <div className="space-y-8">
            <p className="text-2xl sm:text-3xl font-semibold text-slate-200 line-clamp-2">
              {t("name-book-2")}
            </p>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-center gap-x-3">
                <div className="bg-violet-500/20 p-2 rounded-lg">
                  <UserIcon size={18} className="text-violet-300" />
                </div>
                <p className="text-base sm:text-lg">Dan Brown</p>
              </div>

              <div className="flex items-center gap-x-3">
                <div className="bg-violet-500/20 p-2 rounded-lg">
                  <StateIcon size={18} className="text-violet-300" />
                </div>
                <p className="text-base sm:text-lg capitalize">Thriller</p>
              </div>

              <div className="flex items-center gap-x-3">
                <div className="bg-violet-500/20 p-2 rounded-lg">
                  <LibraryIcon size={18} className="text-violet-300" />
                </div>
                <p className="text-base sm:text-lg">
                  {t("new-book-lent") + " " + t("a")} Maria
                </p>
              </div>
            </div>

            <animated.div
              id="icons"
              style={stylesIcons}
              className="flex items-center gap-x-3"
            >
              <button
                onClick={() => openPopUp("notes")}
                className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0"
              >
                <NotesIcon className="w-6 h-6" />
              </button>

              <div className="dropdown dropdown-top dropdown-right">
                <SettingsBtn />
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] shadow menu menu-sm dropdown-content rounded-xl border border-violet-500/20 w-[240px] bg-slate-800 mb-1 text-white"
                >
                  <li
                    className="hover:bg-violet-500/15 transition-colors rounded-xl"
                    onClick={() => openPopUp("login")}
                  >
                    <div className="flex flex-row items-center justify-start gap-x-3">
                      <FavoriteIcon size={18} className="text-violet-300" />
                      <p>{t("add-fav")}</p>
                    </div>
                  </li>

                  <li
                    className="my-1.5 hover:bg-violet-500/15 transition-colors rounded-xl"
                    onClick={() => openPopUp("login")}
                  >
                    <div className="flex flex-row items-center justify-start gap-x-3">
                      <EditIcon size={18} className="text-violet-300" />
                      <p>{t("edit-book")}</p>
                    </div>
                  </li>

                  <li
                    className="hover:bg-violet-500/15 transition-colors rounded-xl"
                    onClick={() => openPopUp("login")}
                  >
                    <div className="flex flex-row items-center justify-start gap-x-3">
                      <DeleteIcon size={18} className="text-violet-300" />
                      <p>{t("delete-book")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </animated.div>
          </div>
        </div>
      </article>
    </animated.section>
  );
}

export default GuestPage2;
