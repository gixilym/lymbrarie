import useLoadContent from "@/utils/hooks/useLoadContent";
import usePopUp from "@/utils/hooks/usePopUp";
import { BOOK_HANDLER_URL, inputSearch } from "@/utils/store";
import type { Component } from "@/utils/types";
import axios from "axios";
import { TriangleAlert as WarningIcon } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

function DeleteBookPopUp({ documentId }: { documentId: string }): Component {
  const router: AppRouterInstance = useRouter(),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    { closePopUp } = usePopUp(),
    [t] = useTranslation("global"),
    [_, setSearchVal] = useRecoilState(inputSearch);

  async function deleteDocument(): Promise<void> {
    startLoading();
    axios.delete(BOOK_HANDLER_URL, { data: documentId });
    setSearchVal("");
    closePopUp("delete_book");
    finishLoading();
    router.push("/");
  }

  return (
    <dialog className="backdrop-blur-md w-full h-full absolute top-0 z-50 flex justify-center items-start pt-10 bg-transparent">
      <div className="modal-box">
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
      </div>
    </dialog>
  );
}

export default DeleteBookPopUp;
