import { popupsAtom } from "@/utils/atoms";
import type { Handler, PopUpsIds } from "@/utils/types";
import { useRecoilState } from "recoil";

function usePopUp(): PopUp {
  const [modal, setModals] = useRecoilState<any>(popupsAtom);

  const closePopUp: Pop = id => setModals({ ...modal, [id]: false });

  const openPopUp: Pop = id => setModals({ ...modal, [id]: true });

  function closeBookPopUps(): void {
    closePopUp("offline");
    closePopUp("delete_book");
    closePopUp("edit_book");
    closePopUp("add_book");
    closePopUp("notes");
  }

  function closeAllPopUps(): void {
    closeBookPopUps();
    closePopUp("settings");
    closePopUp("profile");
    closePopUp("support");
    closePopUp("donations");
  }

  return { closePopUp, openPopUp, closeBookPopUps, closeAllPopUps };
}

export default usePopUp;

interface PopUp {
  closePopUp: Pop;
  openPopUp: Pop;
  closeBookPopUps: () => void;
  closeAllPopUps: () => void;
}

type Pop = Handler<PopUpsIds, void>;
