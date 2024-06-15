import { useRecoilState } from "recoil";
import { popupsValue } from "../store";
import type { PopUpsIds } from "../types";

function usePopUp() {
  const [modal, setModals] = useRecoilState(popupsValue);

  function closePopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: false });
  }

  function openPopUp(id: PopUpsIds): void {
    scrollTo({ top: 0, behavior: "smooth" });
    setModals({ ...modal, [id]: true });
  }

  return { closePopUp, openPopUp };
}

export default usePopUp;
