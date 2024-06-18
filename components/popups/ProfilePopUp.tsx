import useSessionExists from "@/utils/hooks/useSessionExists";
import { DEFAULT_COVER } from "@/utils/store";
import type { AccountDetails, Component } from "@/utils/types";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import DialogContainer from "../DialogContainer";
import LogInBtn from "../LogInBtn";
import LogOutBtn from "../LogOut";
import PopUpTitle from "./TitlePopUp";
import ClosePopUpBtn from "../ClosePopUpBtn";

function ProfilePopUp({
  accountDetails,
}: {
  accountDetails: AccountDetails;
}): Component {
  const [t] = useTranslation("global"),
    { userLoggedIn } = useSessionExists(),
    { allBooks, reading, read, pending, user } = accountDetails,
    img: string = user?.image ?? DEFAULT_COVER,
    name: string = user?.name ?? "";

  function UserData(): Component {
    return (
      <>
        <PopUpTitle title={t("profile")} />
        <div className="w-full flex flex-col justify-center items-center gap-y-6">
          <div className="flex flex-col justify-center items-center w-full">
            <Image
              alt="Avatar"
              className="rounded-full sm:w-24 w-20 sm:h-24 h-20 object-cover object-center"
              src={img}
              width={50}
              height={50}
            />
            <p className="sm:text-xl text-lg font-semibold text-center w-full mt-2">
              {name}
            </p>
          </div>

          <table className="table">
            <thead className="sm:text-xl text-lg">
              <tr className="capitalize">
                <th>{t("books")}</th>
                <th>{t("add-book-reading")}</th>
                <th>{t("add-book-pending")}</th>
                <th>{t("add-book-read")}</th>
              </tr>
            </thead>
            <tbody className="sm:text-xl text-lg border-y-[1.5px] border-white/10 text-white/60">
              <tr>
                <td>{allBooks}</td>
                <td>{reading}</td>
                <td>{pending}</td>
                <td>{read}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function NotLogged(): Component {
    return (
      <div className="flex flex-col justify-start items-center gap-y-8 mt-10">
        <p className="sm:text-3xl text-2xl text-center text-pretty">
          {t("access")}
        </p>
        <LogInBtn />
      </div>
    );
  }

  return (
    <DialogContainer divClass="justify-between">
      {name ? <UserData /> : <NotLogged />}
      <div
        className={twMerge(
          name ? "justify-between" : "justify-end",
          "modal-action w-full flex items-center"
        )}
      >
        {userLoggedIn && <LogOutBtn />}
        <ClosePopUpBtn id="profile" />
      </div>
    </DialogContainer>
  );
}

export default ProfilePopUp;
