import { atom, type RecoilState } from "recoil";

const inputSearchVal: RecoilState<string> = atom({
  key: "inputSearchVal",
  default: "",
});

const stateBookVal: RecoilState<string> = atom({
  key: "stateBookVal",
  default: "",
});

const popupsVal: RecoilState<any> = atom({
  key: "popups",
  default: {
    add_book: false,
    edit_book: false,
    delete_book: false,
    profile: false,
    support: false,
    settings: false,
    donations: false,
    offline: false,
  },
});

const zeroBooksVal: RecoilState<boolean> = atom({
  key: "zeroBooksVal",
  default: false,
});

export { inputSearchVal, popupsVal, stateBookVal, zeroBooksVal };
