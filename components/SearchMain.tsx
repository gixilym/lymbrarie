"use client";
import { useRecoilState } from "recoil";
import { inputSearch, checkboxValue } from "@/utils/store";
import AddBookBtn from "./AddBookBtn";

function Search() {
  const [value, setValue] = useRecoilState<any>(inputSearch),
    handleChangeInput = (e: any) => setValue(e?.target?.value),
    [_, setSelectStateValue] = useRecoilState<string>(checkboxValue),
    handleChangeSelect = (value: string) => setSelectStateValue(value);

  return (
    <form className="w-max flex flex-col items-center justify-center py-14 pb-18">
      <div className="w-full h-max flex flex-row gap-x-3 justify-start items-center">
        <div className="join">
          <input
            value={value}
            onChange={handleChangeInput}
            className="font-public backdrop-blur-[2px] input join-item w-[260px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300 text-lg text-slate-300"
            placeholder="Busca por titulo o autor"
            type="search"
          />
          <select
            onChange={e => handleChangeSelect(e.target.value)}
            className="font-public backdrop-blur-[2px] select join-item h-14 w-[160px] text-[17px] bg-slate-800/60 border-2 border-rose-300/10 text-slate-300"
          >
            <option value="">todos</option>
            <option value="Reading">leyendo</option>
            <option value="Read">leídos</option>
            <option value="Pending">pendientes</option>
          </select>
        </div>
        <AddBookBtn />
      </div>
      <div className="divider px-10" />
    </form>
  );
}

export default Search;
