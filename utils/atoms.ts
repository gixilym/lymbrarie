import { atom, type RecoilState } from "recoil";

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
    support: false,
    settings: false,
    donations: false,
    offline: false,
    updates: false,
    login: false
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
})


export { animListAtom, popupsAtom, searchAtom, stateAtom, zeroAtom, coverAtom};

