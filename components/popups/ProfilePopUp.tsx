import type { Book, Component } from "@/utils/types";
import { isUndefined, sum } from "es-toolkit";
import { useEffect, useState } from "react";

import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import { UserRound as Icon } from "lucide-react";
import Image from "next/image";
import LogOutBtn from "../btns/LogOutBtn";
import defaultCover from "@/public/cover.webp";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";

function ProfilePopUp({ profileImg, profileName }: Props): Component {
  const [t] = useTranslation("global"),
    [stateCounts, setStateCounts] = useState<States>({
      Read: 0,
      Reading: 0,
      Pending: 0,
      Borrowed: 0,
    }),
    { Read, Reading, Pending, Borrowed }: States = stateCounts,
    [cacheBooks] = useLocalStorage("cache-books", null);

  useEffect(() => {
    if (Array.isArray(cacheBooks)) {
      const counts: States = {
        Read: 0,
        Reading: 0,
        Pending: 0,
        Borrowed: 0,
      };

      cacheBooks.forEach((b: Book) => {
        const state: string = b.data.state as BookState;
        if (!isUndefined(counts[state])) counts[state]++;
      });

      setStateCounts(counts);
    }
  }, [cacheBooks]);

  function UserData(): Component {
    return (
      <>
        <HeaderPopUp icon={<Icon size={25} />} title={t("profile")} />
        <div className="w-full flex flex-col lg:flex-row justify-center gap-6 items-center text-slate-300">
          <div className="flex flex-col justify-center items-center lg:max-w-[200px] w-full">
            <Image
              alt="avatar"
              className="rounded-full sm:w-24 w-20 sm:h-24 h-20 object-cover object-center"
              src={profileImg ?? defaultCover}
              width={50}
              height={50}
            />
            <p className="sm:text-xl text-lg font-normal text-center w-full mt-2">
              {profileName}
            </p>
          </div>

          <div className="grid gap-3.5 grid-cols-2 text-slate-400 w-full max-w-sm">
            <div className="space-y-2 border-2 border-slate-600/60 rounded-lg flex flex-col justify-center items-center py-2">
              <p className="capitalize text-sm sm:text-xl font-medium">
                {t("books")}
              </p>
              <span className="text-lg sm:text-2xl font-thin text-slate-200">
                {sum([Read, Borrowed, Reading, Pending])}
              </span>
            </div>
            <div className="space-y-2 border-2 border-slate-600/60 rounded-lg flex flex-col justify-center items-center py-2">
              <p className="capitalize text-sm sm:text-xl font-medium">
                {t("new-book-reading")}
              </p>
              <span className="text-lg sm:text-2xl font-thin text-slate-200">
                {Reading}
              </span>
            </div>
            <div className="space-y-2 border-2 border-slate-600/60 rounded-lg flex flex-col justify-center items-center py-2">
              <p className="capitalize text-sm sm:text-xl font-medium">
                {t("new-book-pending")}
              </p>
              <span className="text-lg sm:text-2xl font-thin text-slate-200">
                {Pending}
              </span>
            </div>
            <div className="space-y-2 border-2 border-slate-600/60 rounded-lg flex flex-col justify-center items-center py-2">
              <p className="capitalize text-sm sm:text-xl font-medium">
                {t("new-book-read")}
              </p>
              <span className="text-lg sm:text-2xl font-thin text-slate-200">
                {Read}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DialogContainer id="profile">
      <UserData />
      <div className="justify-between modal-action w-full flex items-center">
        <LogOutBtn />
        <ClosePopUpBtn id="profile" />
      </div>
    </DialogContainer>
  );
}

export default ProfilePopUp;

interface Props {
  profileImg: string;
  profileName: string;
}

type States = { [key: string]: number };

type BookState = "Read" | "Reading" | "Pending" | "Borrowed";
