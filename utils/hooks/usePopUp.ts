import { useRecoilState } from "recoil";
import { popupsValue } from "../store";
import type { PopUpsIds } from "../types";
import useLocalStorage from "./useLocalStorage";

function usePopUp() {
  const [modal, setModals] = useRecoilState(popupsValue);
  const [animations] = useLocalStorage("animations", "true");

  function closePopUp(id: PopUpsIds): void {
    setModals({ ...modal, [id]: false });
  }

  function openPopUp(id: PopUpsIds): void {
    scrollTo({ top: 0, behavior: animations ? "smooth" : "instant" });
    setModals({ ...modal, [id]: true });
  }

  return { closePopUp, openPopUp };
}

export default usePopUp;
