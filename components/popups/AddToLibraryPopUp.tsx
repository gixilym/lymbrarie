import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { animated, useSpring } from "@react-spring/web";
import { CircleHelp } from "lucide-react";
// import { COLLECTION } from "@/utils/consts";
// import { deleteDoc, doc } from "firebase/firestore";
import { dismissNoti, notification } from "@/utils/notifications";
// import { isEqual } from "es-toolkit";
// import { len } from "@/utils/helpers";
import { NextRouter, useRouter } from "next/router";
// import { searchAtom, zeroAtom } from "@/utils/atoms";
// import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function AddToLibraryPopUp({ documentId, title }: Props): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    [animations] = useLocalStorage("animations", true),
    router: NextRouter = useRouter(),
    // setSearchVal: SetState = useSetRecoilState<string>(searchAtom),
    // setZeroBooks: SetState = useSetRecoilState<boolean>(zeroAtom),
    // [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
    // [, setAllTitles] = useLocalStorage("all-titles", []),
    { isLoading, startLoading, finishLoading } = useLoadContent(),
    [, setShowNoti] = useLocalStorage("added", []),
    [styles] = useSpring(() => ({
      from: { transform: animations ? "scale(0.7)" : "scale(1)" },
      to: { transform: "scale(1)" },
      config: { duration: 100 },
    }));

  async function addRecommendation() {
    startLoading();
    notification("loading", t("adding"));

    console.log("documentId", documentId);
    console.log("title", title);

    const lol = setTimeout(() => {
      dismissNoti();
      redirectToHome();
    }, 4000);
    return () => clearTimeout(lol);

    // try {
    //   await deleteDoc(doc(COLLECTION, documentId));
    //   setSearchVal("");
    //   setZeroBooks(isEqual(len(cacheBooks), 1));
    //   if (isEqual(len(cacheBooks), 1)) {
    //     setCacheBooks(null);
    //     setAllTitles([]);
    //     redirectToHome();
    //   } else {
    //     setCacheBooks(cacheBooks?.filter((b: Book) => b?.data?.title != title));
    //     setAllTitles(cacheBooks?.map((b: Book) => b?.data?.title));
    //     redirectToHome();
    //   }
    // } catch (err: any) {
    //   router.push("/error");
    //   console.error(`catch 'addRecommendation' ${err.message}`);
    // } finally {
    //   dismissNoti();
    // }
  }

  function redirectToHome(): void {
    setShowNoti(true);
    closePopUp("recommendation");
    finishLoading();
    router.push("/");
  }

  return (
    <dialog
      onClick={() => closePopUp("recommendation")}
      className="select-none backdrop-blur-md w-full h-full fixed top-0 z-50 flex justify-center items-start pt-10 bg-transparent px-6 sm:px-0"
    >
      <animated.div
        onClick={e => e.stopPropagation()}
        style={styles}
        className="modal-box mt-28 sm:mt-20 w-full backdrop-blur-md border border-violet-500/20 bg-slate-900/90 rounded-2xl p-8"
      >
        <div className="flex flex-row justify-start items-end sm:items-start gap-x-4">
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <CircleHelp size={27} />
          </div>
          <p className="font-bold tracking-wide text-sm sm:text-lg pt-1.5 text-white">
            {t("confirmation")}
          </p>
        </div>
        <p className="py-4 text-lg sm:text-xl text-violet-100">
          {t("add-recommendation")}
        </p>
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              disabled={isLoading}
              type="button"
              onClick={() => closePopUp("recommendation")}
              className="px-4 py-2 rounded-xl bg-slate-900/60
            border border-violet-500/15
            hover:bg-slate-900/80 hover:border-violet-500/30
            transition-colors disabled:opacity-50
            text-slate-300 text-lg"
            >
              {t("cancel")}
            </button>

            <button
              disabled={isLoading}
              onClick={addRecommendation}
              type="button"
              className="btn font-thin px-8 bg-violet-700 hover:bg-violet-700/70 text-white text-sm sm:text-lg w-26"
            >
              {t("add")}
            </button>
          </form>
        </div>
      </animated.div>
    </dialog>
  );
}

export default AddToLibraryPopUp;

interface Props {
  documentId: string;
  title: string;
}
