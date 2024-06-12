import { useRecoilState } from "recoil";
import { modalsValue } from "../store";
import type { Ids } from "../types";

function usePopUp() {
  const [modal, setModals] = useRecoilState(modalsValue);

  function closePopUp(id: Ids): void {
    setModals({ ...modal, [id]: false });
  }

  function openPopUp(id: Ids): void {
    scrollTo({ top: 0, behavior: "smooth" });
    setModals({ ...modal, [id]: true });
  }

  return { closePopUp, openPopUp };
}

export default usePopUp;
