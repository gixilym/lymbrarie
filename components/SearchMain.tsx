"use client";
import type { Component, InputEvent } from "@/utils/types";
import { checkboxValue, inputSearch } from "@/utils/store";
import AddBookBtn from "./AddBookBtn";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

function SearchMain(): Component {
  const [value, setValue] = useRecoilState(inputSearch),
    handleChangeInput = (e: InputEvent) => setValue(e.target.value),
    [selectVal, setSelectStateValue] = useRecoilState<string>(checkboxValue),
    handleChangeSelect = (value: string) => setSelectStateValue(value),
    [t] = useTranslation("global");

  function selectedState(state: string) {
    return selectVal == state
      ? "bg-blue-300 text-gray-700"
      : "bg-slate-800 text-white";
  }

  return (
    <form className="w-full sm:w-max flex flex-col items-center justify-center ">
      <div className="w-full h-max flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2 justify-start items-center">
        <div className="join">
          <input
            value={value}
            onChange={handleChangeInput}
            className="focus:outline-0 font-public backdrop-blur-[2px] input join-item w-[260px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300 text-lg text-slate-300"
            placeholder={t("Search.placeholder")}
            type="search"
          />
          <select
            value={selectVal}
            onChange={e => handleChangeSelect(e.target.value)}
            className="w-full focus:outline-0 font-public backdrop-blur-[2px] select join-item h-14 sm:w-[160px] text-[17px] bg-slate-800/60 border-2 border-rose-300/10 text-slate-300 "
          >
            <option
              className={twMerge(selectedState(""), "border-t-2")}
              value=""
            >
              {t("Search.select.all")}
            </option>
            <option className={selectedState("Reading")} value="Reading">
              {t("Search.select.reading")}
            </option>
            <option className={selectedState("Read")} value="Read">
              {t("Search.select.read")}
            </option>
            <option className={selectedState("Pending")} value="Pending">
              {t("Search.select.pending")}
            </option>
            <option className={selectedState("Borrowed")} value="Borrowed">
              {t("Search.select.borrowed")}
            </option>
          </select>
        </div>
        <AddBookBtn text={t("Search.add-book")} />
      </div>
    </form>
  );
}

export default SearchMain;
