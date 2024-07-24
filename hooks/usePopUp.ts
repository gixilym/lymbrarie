import { useRecoilState } from "recoil";
import { popupsAtom } from "@/utils/atoms";
import type { PopUpsIds } from "@/utils/types";

function usePopUp(): PopUp {
  const [modal, setModals] = useRecoilState<any>(popupsAtom);

  function closePopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: false });
  }

  function openPopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: true });
  }

  function closeAllPopUps(): void {
    closePopUp("offline");
    closePopUp("delete_book");
    closePopUp("edit_book");
    closePopUp("add_book");
    closePopUp("notes");
  }

  return { closePopUp, openPopUp, closeAllPopUps };
}

export default usePopUp;

type PopUp = {
  closePopUp: (id: PopUpsIds) => void;
  openPopUp: (id: PopUpsIds) => void;
  closeAllPopUps: () => void;
};
