import type { Component } from "@/utils/types";
import {
  BookmarkCheck as FavoriteCheckIcon,
  Bookmark as FavoriteIcon,
} from "lucide-react";
import type { MouseEventHandler } from "react";

function FavoritesBtn({ showFavs, alternateFavorites }: Props): Component {
  return (
    <button className="btn btn-ghost btn-square" onClick={alternateFavorites}>
      {showFavs ? <FavoriteCheckIcon size={28} /> : <FavoriteIcon size={28} />}
    </button>
  );
}

export default FavoritesBtn;

interface Props {
  showFavs: boolean;
  alternateFavorites: MouseEventHandler<HTMLButtonElement>;
}
