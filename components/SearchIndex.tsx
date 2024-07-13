import { inputSearch, stateBookValue } from "@/utils/store";
import type { Component, InputEvent } from "@/utils/types";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import AddBookBtn from "./btns/AddBookBtn";

function SearchIndex({ isLogged }: { isLogged: boolean }): Component {
  const [value, setValue] = useRecoilState(inputSearch),
    handleChangeInput = (e: InputEvent) => setValue(e.target.value),
    [selectVal, setSelectStateValue] = useRecoilState<string>(stateBookValue),
    handleChangeSelect = (value: string) => setSelectStateValue(value),
    [t] = useTranslation("global");

  function selectedState(state: string) {
    return selectVal == state
      ? "bg-blue-300 text-gray-700"
      : "bg-slate-800 text-white";
  }

  return (
    <form className="w-full sm:w-max flex flex-col items-center justify-center select-none">
      <div className="w-full h-max flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2 justify-start items-center">
        <div className="join">
          <input
            value={value}
            onChange={handleChangeInput}
            className="focus:outline-0 font-pop backdrop-blur-[2px] input join-item w-[270px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300 text-lg text-slate-300 placeholder:w-full"
            placeholder={t("placeholder-search")}
            type="search"
          />
          <select
            value={selectVal}
            onChange={e => handleChangeSelect(e.target.value)}
            className="w-full focus:outline-0 font-pop backdrop-blur-[2px] select join-item h-14 sm:w-[160px] text-[17px] bg-slate-800/60 border-2 border-rose-300/10 text-slate-300 "
          >
            <option
              className={twMerge(selectedState(""), "border-t-2")}
              value=""
            >
              {t("add-book-all")}
            </option>
            <option className={selectedState("Reading")} value="Reading">
              {t("add-book-reading")}
            </option>
            <option className={selectedState("Read")} value="Read">
              {t("add-book-read")}
            </option>
            <option className={selectedState("Pending")} value="Pending">
              {t("add-book-pending")}
            </option>
            <option className={selectedState("Borrowed")} value="Borrowed">
              {t("add-book-borrowed")}
            </option>
          </select>
        </div>
        <AddBookBtn isLogged={isLogged} text={t("new-book")} />
      </div>
    </form>
  );
}

export default SearchIndex;
