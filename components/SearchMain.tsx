"use client";
import { useRecoilState } from "recoil";
import { inputSearch, checkboxValue } from "@/utils/store";
import Link from "next/link";
import { SettingsSVG } from "@/utils/svgs";

function Search() {
  const [value, setValue] = useRecoilState(inputSearch),
    handleChangeInput = (e: any) => setValue(e.target.value),
    [_, setSelectStateValue] = useRecoilState<string>(checkboxValue),
    handleChangeSelect = (e: any) => setSelectStateValue(e.target.value);

  return (
    <form className="w-full flex flex-col items-center justify-center pt-20 pb-14 gap-y-4">
      <div className="w-full flex flex-row gap-x-3 justify-center items-start">
        <input
          value={value}
          onChange={handleChangeInput}
          className="w-[420px] text-white text-start px-4 py-3 bg-gray-800 rounded-lg border-2 border-gray-700 placeholder-gray-100 text-xl"
          placeholder="Filter by title or author"
          type="search"
        />
        <Link
          href="/book/add"
          className="relative inline-flex items-center justify-center px-6 py-3.5 overflow-hidden font-mono  font-semibold bg-gray-800 rounded-lg group text-white tracking-wider"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-700 rounded-full group-hover:w-56 group-hover:h-56" />
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700" />
          <span className="relative text-xl">Add book</span>
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center w-[573px] text-white">
        <select
          className="text-white bg-transparent"
          onChange={handleChangeSelect}
          id="select-state"
        >
          <option value="">All</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Pending">Pending</option>
        </select>
        <SettingsSVG />
      </div>
    </form>
  );
}

export default Search;
