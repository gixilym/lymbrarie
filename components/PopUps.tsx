import { modalsValue } from "@/utils/store";
import type { AccountInfo, Component } from "@/utils/types";
import { useRecoilState } from "recoil";
import NewBookPopUp from "./popups/NewBookPopUp";
import ProfilePopUp from "./popups/ProfilePopUp";
import SettingsPopUp from "./popups/SettingsPopUp";
import SupportPopUp from "./popups/SupportPopUp";
import DonationsPopUp from "./popups/DonationsPopUp";

function PopUps(props: Props): Component {
  const { allTitles, accountInfo } = props;
  const [modal] = useRecoilState(modalsValue);

  return (
    <>
      {modal.add_book && <NewBookPopUp allTitles={allTitles} />}
      {modal.profile && <ProfilePopUp accountInfo={accountInfo} />}
      {modal.settings && <SettingsPopUp />}
      {modal.support && <SupportPopUp />}
      {modal.donations && <DonationsPopUp />}
    </>
  );
}

export default PopUps;

interface Props {
  allTitles: string[];
  accountInfo: AccountInfo;
}
