import { popupsAtom } from "@/utils/atoms";
import type { Component } from "@/utils/types";
import { useRecoilState } from "recoil";
import NewBookPopUp from "./popups/NewBookPopUp";
import OfflinePopUp from "./popups/OfflinePopUp";
import ProfilePopUp from "./popups/ProfilePopUp";
import SettingsPopUp from "./popups/SettingsPopUp";
import SupportPopUp from "./popups/SupportPopUp";

function PopUps(props: Props): Component {
  const { UID, profileImg, profileName, isGuest } = props;
  const [popup] = useRecoilState<any>(popupsAtom);

  return (
    <>
      {popup.profile && (
        <ProfilePopUp
          profileImg={profileImg}
          profileName={profileName}
          isGuest={isGuest}
        />
      )}
      {popup.add_book && <NewBookPopUp UID={UID} />}
      {popup.settings && <SettingsPopUp />}
      {popup.support && <SupportPopUp />}
      {popup.offline && <OfflinePopUp />}
    </>
  );
}

export default PopUps;

interface Props {
  profileImg: string;
  profileName: string;
  UID: string;
  isGuest: boolean;
}
