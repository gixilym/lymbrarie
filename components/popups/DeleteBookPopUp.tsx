import useLoadContent from "@/utils/hooks/useLoadContent";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import usePopUp from "@/utils/hooks/usePopUp";
import { inputSearch } from "@/utils/store";
import { BOOK_HANDLER_URL } from "@/utils/consts";
import type { Book, Component } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import { TriangleAlert as WarningIcon } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function DeleteBookPopUp({ documentId, title }: Props): Component {
  const { closePopUp } = usePopUp(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    router: AppRouterInstance = useRouter(),
    [, setSearchVal] = useRecoilState(inputSearch),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [styles, animate] = useSpring(() => ({
      transform: animations ? "scale(0.5)" : "scale(1)",
      config: { duration: 100 },
    }));

  useEffect(() => {
    if (animations) animate.start({ transform: "scale(1)" });
  }, [animate]);

  async function deleteDocument(): Promise<void> {
    const arr: Book[] = cacheBooks?.filter((b: Book) => b.data.title != title);
    startLoading();
    axios.delete(BOOK_HANDLER_URL, { data: documentId });
    setCacheBooks(arr.length == 0 ? null : arr);
    setSearchVal("");
    closePopUp("delete_book");
    finishLoading();
    router.push("/");
  }

  return (
    <dialog className="select-none backdrop-blur-md w-full h-full absolute top-0 z-50 flex justify-center items-start pt-10 bg-transparent">
      <animated.div style={styles} className="modal-box">
        <div className="flex flex-row justify-start items-center gap-x-4">
          <WarningIcon size={25} />
          <p className="font-bold text-lg">{t("warning")}</p>
        </div>
        <p className="py-4 text-xl">{t("delete-message")}</p>
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              disabled={isLoading}
              onClick={() => closePopUp("delete_book")}
              className="btn font-public bg-slate-700 hover:bg-slate-600 text-white text-lg w-24"
            >
              {t("cancel")}
            </button>
            {isLoading ? (
              <button className="btn font-public text-white text-lg w-26">
                {t("deleting")}
              </button>
            ) : (
              <button
                onClick={deleteDocument}
                type="button"
                className="btn font-public bg-red-700 hover:bg-red-500 text-white text-lg w-26"
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
