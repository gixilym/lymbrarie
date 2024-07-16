import defaultCover from "@/public/cover.webp";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Book, Component } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClosePopUpBtn from "../btns/ClosePopUpBtn";
import LogOutBtn from "../btns/LogOutBtn";
import DialogContainer from "../DialogContainer";
import HeaderPopUp from "../HeaderPopUp";
import { UserRound as Icon } from "lucide-react";
import { isUndefined, sum } from "es-toolkit";

function ProfilePopUp({ profileImg, profileName }: Props): Component {
  const [t] = useTranslation("global"),
    [stateCounts, setStateCounts] = useState<States>({
      Read: 0,
      Reading: 0,
      Pending: 0,
      Borrowed: 0,
    }),
    { Read, Reading, Pending, Borrowed }: States = stateCounts,
    [cacheBooks] = useLocalStorage("cacheBooks", null);

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
        <div className="w-full flex flex-col justify-center items-center gap-y-6 text-slate-300">
          <div className="flex flex-col justify-center items-center w-full">
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

          <table className="table w-full max-w-[550px] ">
            <thead className="sm:text-xl text-lg">
              <tr className="capitalize text-slate-500 border-0 border-slate-600/30 border-b-0">
                <th>{t("books")}</th>
                <th>{t("add-book-reading")}</th>
                <th>{t("add-book-pending")}</th>
                <th>{t("add-book-read")}</th>
              </tr>
            </thead>
            <tbody className="sm:text-xl text-lg">
              <tr className="border-0 border-slate-600/30 ">
                <td>{sum([Read, Borrowed, Reading, Pending])}</td>
                <td>{Reading}</td>
                <td>{Pending}</td>
                <td>{Read}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <DialogContainer divClass="justify-between">
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
