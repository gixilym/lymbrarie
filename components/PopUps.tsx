import { popupsValue } from "@/utils/store";
import type { Component } from "@/utils/types";
import { useRecoilState } from "recoil";
import DonationsPopUp from "./popups/DonationsPopUp";
import NewBookPopUp from "./popups/NewBookPopUp";
import OfflinePopUp from "./popups/OfflinePopUp";
import ProfilePopUp from "./popups/ProfilePopUp";
import SettingsPopUp from "./popups/SettingsPopUp";
import SupportPopUp from "./popups/SupportPopUp";

function PopUps(props: Props): Component {
  const { userID, profileImg, profileName } = props;
  const [popup] = useRecoilState<any>(popupsValue);

  return (
    <>
      {popup.profile && (
        <ProfilePopUp profileImg={profileImg} profileName={profileName} />
      )}
      {popup.add_book && <NewBookPopUp userID={userID} />}
      {popup.settings && <SettingsPopUp />}
      {popup.support && <SupportPopUp />}
      {popup.donations && <DonationsPopUp />}
      {popup.offline && <OfflinePopUp />}
    </>
  );
}

export default PopUps;

interface Props {
  profileImg: string;
  profileName: string;
  userID: string;
}
