import { popupsAtom } from "@/utils/atoms";
import type { Handler, PopUpsIds } from "@/utils/types";
import { useRecoilState } from "recoil";

function usePopUp(): PopUp {
  const [modal, setModals] = useRecoilState<any>(popupsAtom);

  const closePopUp: Pop = id => setModals({ ...modal, [id]: false });

  const openPopUp: Pop = id => setModals({ ...modal, [id]: true });

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

interface PopUp {
  closePopUp: Pop;
  openPopUp: Pop;
  closeAllPopUps: () => void;
}

type Pop = Handler<PopUpsIds, void>;
