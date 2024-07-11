import { popupsValue } from "@/utils/store";
import type { Component } from "@/utils/types";
import { useRecoilState } from "recoil";
import NewBookPopUp from "./popups/NewBookPopUp";
import ProfilePopUp from "./popups/ProfilePopUp";
import SettingsPopUp from "./popups/SettingsPopUp";
import SupportPopUp from "./popups/SupportPopUp";
import DonationsPopUp from "./popups/DonationsPopUp";

function PopUps(props: Props): Component {
  const { userID, profileImg, profileName } = props;
  const [popup] = useRecoilState(popupsValue);

  return (
    <>
      {popup.add_book && <NewBookPopUp userID={userID} />}
      {popup.profile && (
        <ProfilePopUp profileImg={profileImg} profileName={profileName} />
      )}
      {popup.settings && <SettingsPopUp />}
      {popup.support && <SupportPopUp />}
      {popup.donations && <DonationsPopUp />}
    </>
  );
}

export default PopUps;

interface Props {
  profileImg: string;
  profileName: string;
  userID: string;
}
