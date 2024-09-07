import { searchAtom, stateAtom } from "@/utils/atoms";
import { formatState, selectStyles } from "@/utils/helpers";
import type {
  Component,
  EventSelect,
  Handler,
  InputEvent,
  SelectOpt,
} from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useRecoilState } from "recoil";
import AppIcon from "./AppIcon";
import AddBookBtn from "./btns/AddBookBtn";

function SearchIndex(): Component {
  const [t] = useTranslation("global"),
    [value, setValue] = useRecoilState<string>(searchAtom),
    [selectVal, setSelectStateVal] = useRecoilState<string>(stateAtom),
    placeholder: string = useMemo(() => formatState(selectVal, t), [selectVal]),
    handleSearch: Handler<InputEvent, void> = (e: InputEvent) =>
      setValue(e.target.value),
    handleSelect: Handler<string, void> = (val: string) =>
      setSelectStateVal(val),
    options: SelectOpt = [
      { value: "", label: t("add-book-all") },
      { value: "Reading", label: t("add-book-reading") },
      { value: "Read", label: t("add-book-read") },
      { value: "Pending", label: t("add-book-pending") },
      { value: "Borrowed", label: t("add-book-borrowed") },
    ] as const;

  return (
    <header className="z-10 w-full mb-0 sm:mb-10 justify-center items-center flex flex-col lg:flex-row h-26 relative">
      <AppIcon />
      <form className="w-full sm:w-max flex flex-col items-center justify-center select-none px-6 sm:px-0">
        <div className="w-full h-max flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2 justify-start items-center">
          <div className="join">
            <input
              id="input-search"
              value={value}
              onChange={handleSearch}
              className="focus:outline-0 focus:border-rose-300/10 backdrop-blur-[2px] input join-item w-[230px] sm:w-[270px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300/70 text-sm sm:text-lg text-slate-300 placeholder:w-full"
              placeholder={t("placeholder-search")}
              type="search"
            />
            <Select
              className="join-item capitalize text-sm sm:text-lg"
              id="select-state"
              isSearchable={false}
              options={options}
              placeholder={placeholder}
              value={selectVal}
              styles={selectStyles(selectVal == "", false)}
              onChange={(e: EventSelect) => handleSelect(e.value)}
            />
          </div>
          <AddBookBtn text={t("new-book")} />
        </div>
      </form>
    </header>
  );
}

export default SearchIndex;
