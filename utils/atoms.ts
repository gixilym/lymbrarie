import { atom, type RecoilState } from "recoil";
import type { ShuffleAtom } from "./types";

const searchAtom: RecoilState<string> = atom({
  key: "search-atom",
  default: "",
});

const stateAtom: RecoilState<string> = atom({
  key: "state-atom",
  default: "",
});

const popupsAtom: RecoilState<any> = atom({
  key: "popups-atom",
  default: {
    add_book: false,
    edit_book: false,
    delete_book: false,
    profile: false,
    settings: false,
    offline: false,
    login: false,
    recommendation: false,
  },
});

const zeroAtom: RecoilState<boolean> = atom({
  key: "zero-atom",
  default: false,
});

const animListAtom: RecoilState<boolean> = atom({
  key: "anim-list-atom",
  default: false,
});

const coverAtom: RecoilState<boolean> = atom({
  key: "cover-atom",
  default: false,
});

const menuAtom: RecoilState<boolean> = atom({
  key: "menu-atom",
  default: false,
});

const scrollAtom: RecoilState<number> = atom({
  key: "scroll-atom",
  default: 0,
});

const shuffleAtom = atom<ShuffleAtom>({
  key: "shuffle-atom",
  default: {
    data: [],
    version: "",
    mode: null,
  },
});

const showFavsAtom: RecoilState<boolean> = atom({
  key: "show-favs-atom",
  default: false,
});

export {
  animListAtom,
  popupsAtom,
  searchAtom,
  stateAtom,
  zeroAtom,
  coverAtom,
  menuAtom,
  scrollAtom,
  shuffleAtom,
  showFavsAtom,
};
