import type { Component, RouterNavigation } from "@/utils/types";
import { collectionDB } from "@/utils/store";
import { TriangleAlert as WarningIcon } from "lucide-react";
import useLoadContent from "@/utils/hooks/useLoadContent";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { deleteDoc, doc } from "firebase/firestore";
import usePopUp from "@/utils/hooks/usePopUp";
import { motion } from "framer-motion";

function DeleteBookPopUp({ documentId }: { documentId: string }): Component {
  const router: RouterNavigation = useRouter(),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    { closePopUp } = usePopUp(),
    [t] = useTranslation("global");

  async function deleteDocument(): Promise<void> {
    startLoading();
    await deleteDoc(doc(collectionDB, documentId));
    closePopUp("delete_book");
    finishLoading();
    router.push("/");
  }

  return (
    <motion.dialog
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="backdrop-blur-md w-full h-full absolute top-0 z-50 flex justify-center items-start pt-10 bg-transparent"
    >
      <div className="modal-box">
        <div className="flex flex-row justify-start items-center gap-x-4">
          <WarningIcon size={25} />
          <p className="font-bold text-lg">{t("ModalBook.warning")}</p>
        </div>
        <p className="py-4 text-lg">{t("ModalBook.delete-message")}</p>
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              disabled={isLoading}
              onClick={() => closePopUp("delete_book")}
              className="btn font-public bg-slate-700 hover:bg-slate-600 text-white text-md w-24"
            >
              {t("ModalNewBook.cancel")}
            </button>
            {isLoading ? (
              <button className="btn font-public text-white text-md w-26">
                {t("ModalDelete.deleting")}
              </button>
            ) : (
              <button
                onClick={deleteDocument}
                type="button"
                className="btn font-public bg-red-600 hover:bg-red-500 text-white text-md w-26"
              >
                {t("ModalBook.delete")}
              </button>
            )}
          </form>
        </div>
      </div>
    </motion.dialog>
  );
}

export default DeleteBookPopUp;
