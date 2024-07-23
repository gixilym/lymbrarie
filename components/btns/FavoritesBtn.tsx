import useLocalStorage from "@/hooks/useLocalStorage";
import { animListAtom } from "@/utils/atoms";
import type { Component } from "@/utils/types";
import {
  BookmarkCheck as FavoriteCheckIcon,
  Bookmark as FavoriteIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

function FavoritesBtn({ showFavs, alternateFavorites }: Props): Component {
  const [t] = useTranslation("global");
  const [animations] = useLocalStorage("animations", true);
  const [animate, setAnimate] = useRecoilState<boolean>(animListAtom);

  return (
    <button
      title={t("favorites")}
      className={twMerge(
        showFavs ? "bg-slate-700/45" : "bg-transparent",
        "btn btn-ghost btn-square"
      )}
      onClick={e => {
        alternateFavorites(e);
        if (animations) setAnimate(!animate);
      }}
    >
      {showFavs ? <FavoriteCheckIcon size={28} /> : <FavoriteIcon size={28} />}
    </button>
  );
}

export default FavoritesBtn;

interface Props {
  showFavs: boolean;
  alternateFavorites: MouseEventHandler<HTMLButtonElement>;
}
