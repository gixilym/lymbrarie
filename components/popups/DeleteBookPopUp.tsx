import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { animated, useSpring } from "@react-spring/web";
import { COLLECTION } from "@/utils/consts";
import { deleteDoc, doc } from "firebase/firestore";
import { dismissNotification, notification } from "@/utils/notifications";
import { isEqual } from "es-toolkit";
import { len } from "@/utils/helpers";
import { NextRouter, useRouter } from "next/router";
import { searchAtom, zeroAtom } from "@/utils/atoms";
import { TriangleAlert as WarningIcon } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Book, Component, SetState } from "@/utils/types";

function DeleteBookPopUp({ documentId, title }: Props): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    [animations] = useLocalStorage("animations", true),
    router: NextRouter = useRouter(),
    setSearchVal: SetState = useSetRecoilState<string>(searchAtom),
    setZeroBooks: SetState = useSetRecoilState<boolean>(zeroAtom),
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    [, setAllTitles] = useLocalStorage("all-titles", []),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [, setShowNoti] = useLocalStorage("deleted", []),
    [styles] = useSpring(() => ({
      from: { transform: animations ? "scale(0.7)" : "scale(1)" },
      to: { transform: "scale(1)" },
      config: { duration: 100 },
    }));

  async function deleteDocument(): Promise<void> {
    startLoading();
    notification("loading", t("deleting"));

    try {
      await deleteDoc(doc(COLLECTION, documentId));
      setSearchVal("");
      setZeroBooks(isEqual(len(cacheBooks), 1));
      if (isEqual(len(cacheBooks), 1)) {
        setCacheBooks(null);
        setAllTitles([]);
        redirectToHome();
      } else {
        setCacheBooks(cacheBooks?.filter((b: Book) => b?.data?.title != title));
        setAllTitles(cacheBooks?.map((b: Book) => b?.data?.title));
        redirectToHome();
      }
    } catch (err: any) {
      router.push("/error");
      console.error(`catch 'deleteDocument' ${err.message}`);
    } finally {
      dismissNotification();
    }
  }

  function redirectToHome(): void {
    setShowNoti(true);
    closePopUp("delete_book");
    finishLoading();
    router.push("/");
  }

  return (
    <dialog
      onClick={() => closePopUp("delete_book")}
      className="select-none backdrop-blur-md w-full h-full fixed top-0 z-50 flex justify-center items-start pt-10 bg-transparent px-6 sm:px-0"
    >
      <animated.div
        onClick={e => e.stopPropagation()}
        style={styles}
        className="modal-box mt-28 sm:mt-20 w-full"
      >
        <div className="flex flex-row justify-start items-end sm:items-start gap-x-4">
          <WarningIcon size={25} />
          <p className="font-bold tracking-wide text-sm sm:text-lg">
            {t("warning")}
          </p>
        </div>
        <p className="py-4 text-lg sm:text-xl">{t("delete-message")}</p>
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              disabled={isLoading}
              onClick={() => closePopUp("delete_book")}
              className="btn font-thin bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm sm:text-lg"
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
