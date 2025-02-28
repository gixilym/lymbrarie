import NewBookPopUp from "./popups/NewBookPopUp";
import OfflinePopUp from "./popups/OfflinePopUp";
import { popupsAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import type { Component } from "@/utils/types";
import LogInPopUp from "./popups/LogInPopUp";

function Popups({ UID }: Props): Component {
  const [popup] = useRecoilState<any>(popupsAtom);

  return (
    <>
      {popup.add_book && <NewBookPopUp UID={UID} />}
      {popup.offline && <OfflinePopUp />}
      {popup.login && <LogInPopUp />}
    </>
  );
}

export default Popups;

interface Props {
  UID: string;
}
