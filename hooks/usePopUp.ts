import { useRecoilState } from "recoil";
import { popupsVal } from "@/utils/store";
import type { PopUpsIds } from "@/utils/types";

function usePopUp(): PopUp {
  const [modal, setModals] = useRecoilState<any>(popupsVal);

  function closePopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: false });
  }

  function openPopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: true });
  }

  return { closePopUp, openPopUp };
}

export default usePopUp;

type PopUp = {
  closePopUp: (id: PopUpsIds) => void;
  openPopUp: (id: PopUpsIds) => void;
};
