import { searchAtom, stateAtom } from "@/utils/atoms";
import type { Component, InputEvent } from "@/utils/types";
import { isEqual } from "es-toolkit";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import AddBookBtn from "./btns/AddBookBtn";

function SearchIndex(): Component {
  const [value, setValue] = useRecoilState<string>(searchAtom),
    handleChangeInput = (e: InputEvent) => setValue(e.target.value),
    [selectVal, setSelectStateValue] = useRecoilState<string>(stateAtom),
    handleChangeSelect = (value: string) => setSelectStateValue(value),
    [t] = useTranslation("global");

  function selectedState(state: string) {
    return isEqual(selectVal, state)
      ? "bg-blue-300 text-gray-700"
      : "bg-slate-800 text-white";
  }

  return (
    <header className="z-10 w-full mb-6 sm:mb-10 justify-center items-center flex h-26">
      <form className="w-full sm:w-max flex flex-col items-center justify-center select-none px-6 sm:px-0">
        <div className="w-full h-max flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2 justify-start items-center">
          <div className="join">
            <input
              id="search"
              value={value}
              onChange={handleChangeInput}
              className="focus:outline-0 focus:border-rose-300/10 backdrop-blur-[2px] input join-item w-[230px] sm:w-[270px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300/70 text-sm sm:text-lg text-slate-300 placeholder:w-full"
              placeholder={t("placeholder-search")}
              type="search"
            />
            <select
              id="state"
              value={selectVal}
              onChange={e => handleChangeSelect(e.target.value)}
              className={twMerge(
                selectVal != ""
                  ? "border-rose-300/40 focus:border-rose-300/40 text-slate-300/90"
                  : "border-rose-300/10 focus:border-rose-300/10 text-slate-300/70",
                "w-full focus:outline-0 border-2 backdrop-blur-[2px] select join-item h-14 sm:w-[160px] text-[13px] sm:text-[17px] bg-slate-800/60 cursor-default"
              )}
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
          <AddBookBtn text={t("new-book")} />
        </div>
      </form>
    </header>
  );
}

export default SearchIndex;
