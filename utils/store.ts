import { atom, RecoilState } from "recoil";

const inputSearch: RecoilState<string> = atom({
  key: "inputSearch",
  default: "",
});

const stateBookValue: RecoilState<string> = atom({
  key: "stateBookValue",
  default: "",
});

const popupsValue: RecoilState<any> = atom({
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

const zeroBooksValue: RecoilState<boolean> = atom({
  key: "zeroBooksValue",
  default: false,
});

export { inputSearch, popupsValue, stateBookValue, zeroBooksValue };
