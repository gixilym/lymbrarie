import AddBookBtn from "./btns/AddBookBtn";
import LogInBtn from "./btns/LogInBtn";
import Select from "react-select";
import useGuest from "@/hooks/useGuest";
import { formatState, selectStyles } from "@/utils/helpers";
import { menuAtom, searchAtom, stateAtom } from "@/utils/atoms";
import { twMerge } from "tailwind-merge";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type {
  Component,
  EventSelect,
  Handler,
  InputEvent,
  SelectOpt,
} from "@/utils/types";

function SearchIndex(): Component {
  const [t] = useTranslation("global"),
    { isGuest } = useGuest(),
    [value, setValue] = useRecoilState<string>(searchAtom),
    [selectVal, setSelectStateVal] = useRecoilState<string>(stateAtom),
    [menuIsOpen] = useRecoilState(menuAtom),
    handleSearch: Handler<InputEvent, void> = (e: InputEvent) =>
      setValue(e.target.value),
    handleSelect: Handler<string, void> = (val: string) =>
      setSelectStateVal(val),
    options: SelectOpt = [
      { value: "", label: "\xA0>\xA0\xA0" + t("new-book-all") },
      {
        value: "Reading",
        label: "\xA0>\xA0\xA0" + t("new-book-reading"),
      },
      { value: "Read", label: "\xA0>\xA0\xA0" + t("new-book-read") },
      { value: "Pending", label: "\xA0>\xA0\xA0" + t("new-book-pending") },
      {
        value: "Lent",
        label: "\xA0>\xA0\xA0" + t("new-book-lent"),
      },
    ] as const;

  return (
    <div
      className={twMerge(
        menuIsOpen ? "hidden" : "flex",
        "w-full mb-0 sm:mb-10 flex-col items-center gap-y-8"
      )}
    >
      <form className="w-full max-w-3xl flex flex-col items-center justify-center select-none px-6 sm:px-0">
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="join w-full sm:w-auto">
            <input
              id="input-search"
              value={value}
              onChange={handleSearch}
              className="focus:outline-0 focus:border-rose-300/10 backdrop-blur-[2px] input join-item w-[230px] sm:w-[270px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300/70 text-sm sm:text-lg text-slate-300 placeholder:w-full"
              placeholder={t("placeholder-library")}
              type="search"
              autoFocus
            />
            <Select
              className="join-item capitalize text-sm text-slate-900"
              id="select-state"
              isSearchable={false}
              options={options}
              placeholder={formatState(selectVal, t)}
              value={selectVal}
              styles={selectStyles(selectVal == "", false)}
              onChange={(e: EventSelect) => handleSelect(e.value)}
            />
          </div>

          {isGuest ? <LogInBtn /> : <AddBookBtn text={t("new-book")} />}
        </div>
      </form>
    </div>
  );
}

export default SearchIndex;
