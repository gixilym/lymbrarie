import { popupsValue } from "@/utils/store";
import type { AccountInfo, Component } from "@/utils/types";
import { useRecoilState } from "recoil";
import NewBookPopUp from "./popups/NewBookPopUp";
import ProfilePopUp from "./popups/ProfilePopUp";
import SettingsPopUp from "./popups/SettingsPopUp";
import SupportPopUp from "./popups/SupportPopUp";
import DonationsPopUp from "./popups/DonationsPopUp";

function PopUps(props: Props): Component {
  const { allTitles, accountDetails } = props;
  const [popup] = useRecoilState(popupsValue);

  return (
    <>
      {popup.add_book && <NewBookPopUp allTitles={allTitles} />}
      {popup.profile && <ProfilePopUp accountDetails={accountDetails} />}
      {popup.settings && <SettingsPopUp />}
      {popup.support && <SupportPopUp />}
      {popup.donations && <DonationsPopUp />}
    </>
  );
}

export default PopUps;

interface Props {
  allTitles: string[];
  accountDetails: AccountDetails;
}
