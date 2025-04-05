import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import useTitles from "@/hooks/useTitles";
import { animated, useSpring } from "@react-spring/web";
import { animatePopup, len } from "@/utils/helpers";
import { COLLECTION_BOOKS, PAGES } from "@/utils/consts";
import { deleteDoc, doc } from "firebase/firestore";
import { dismissNoti, notification } from "@/utils/notifications";
import { isEqual } from "es-toolkit";
import { searchAtom, zeroAtom } from "@/utils/atoms";
import { TriangleAlert as WarningIcon } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { type NextRouter, useRouter } from "next/router";
import type { Book, Component, SetState } from "@/utils/types";

function DeleteBookPopUp({ documentId, title }: Props): Component {
  const { updateTitles } = useTitles(),
    [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    { push }: NextRouter = useRouter(),
    setSearchVal: SetState = useSetRecoilState<string>(searchAtom),
    setZeroBooks: SetState = useSetRecoilState<boolean>(zeroAtom),
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [, setShowNoti] = useLocalStorage("deleted", false),
    [styles] = useSpring(() => animatePopup());

  async function deleteDocument(): Promise<void> {
    startLoading();
    notification("loading", t("deleting"));

    try {
      await deleteDoc(doc(COLLECTION_BOOKS, documentId));
      setSearchVal("");
      setZeroBooks(isEqual(len(cacheBooks), 1));
      updateData();
    } catch (err: any) {
      push(PAGES.ERROR);
      console.error(`catch 'deleteDocument' ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  function updateData(): void {
    if (len(cacheBooks) == 1) {
      setCacheBooks(null);
      updateTitles([]);
      redirectToHome();
    } else {
      const updatedBooks: Book[] = cacheBooks?.filter(
        (b: Book) => b?.data?.title != title
      );
      setCacheBooks(updatedBooks);
      updateTitles(updatedBooks);
      redirectToHome();
    }
  }

  function redirectToHome(): void {
    setShowNoti(true);
    closePopUp("delete_book");
    finishLoading();
    push("/");
  }

  return (
    <dialog
      onClick={() => closePopUp("delete_book")}
      className="select-none backdrop-blur-md w-full h-full fixed top-0 z-50 flex justify-center items-start pt-10 bg-transparent px-6 sm:px-0"
    >
      <animated.div
        onClick={e => e.stopPropagation()}
        style={styles}
        className="modal-box mt-28 sm:mt-20 w-full bg-slate-900/90 rounded-2xl p-8 backdrop-blur-md border border-violet-500/20"
      >
        <div className="flex flex-row justify-start items-start gap-x-4">
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <WarningIcon size={25} />
          </div>
          <p className="font-bold tracking-wide text-sm sm:text-lg pt-1.5 text-white">
            {t("warning")}
          </p>
        </div>
        <p className="py-4 text-lg sm:text-xl text-violet-100">
          {t("delete-message")}
        </p>
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              disabled={isLoading}
              type="button"
              onClick={() => closePopUp("delete_book")}
              className="px-4 py-2 rounded-xl bg-slate-900/60 
            border border-violet-500/15 
            hover:bg-slate-900/80 hover:border-violet-500/30 
            transition-colors disabled:opacity-50 
            text-slate-300 text-lg"
            >
              {t("cancel")}
            </button>

            {isLoading ? (
              <button
                disabled
                className="btn font-thin cursor-default text-white text-sm sm:text-lg w-26"
              >
                {t("deleting")}
              </button>
            ) : (
              <button
                onClick={deleteDocument}
                type="button"
                className="btn font-thin bg-red-800/90 hover:bg-red-700 text-white text-sm sm:text-lg w-26"
              >
                {t("delete-book")}
              </button>
            )}
          </form>
        </div>
      </animated.div>
    </dialog>
  );
}

export default DeleteBookPopUp;

interface Props {
  documentId: string;
  title: string;
}
