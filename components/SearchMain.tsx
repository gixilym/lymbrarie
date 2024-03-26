"use client";
import { useRecoilState } from "recoil";
import { inputSearch, checkboxValue } from "@/utils/store";
import Link from "next/link";
import { SettingsSVG } from "@/utils/svgs";
import Select, { Options, SingleValue, StylesConfig } from "react-select";

function Search() {
  const [value, setValue] = useRecoilState<any>(inputSearch),
    handleChangeInput = (e: any) => setValue(e?.target?.value),
    [_, setSelectStateValue] = useRecoilState<string>(checkboxValue),
    handleChangeSelect = (value: string) => setSelectStateValue(value),
    optionsSelect: Options<{ value: string; label: string }> = [
      { value: "", label: "Todos" },
      { value: "Read", label: "Leídos" },
      { value: "Reading", label: "Leyendo" },
      { value: "Pending", label: "Pendientes" },
    ],
    stylesSelect: StylesConfig = {
      control: (styles: object) => ({
        ...styles,
        backgroundColor: "transparent",
        width: "150px",
        borderColor: "rgb(253 164 175)",
      }),
      singleValue: (styles: object) => ({
        ...styles,
        color: "#e1e1e1",
      }),
      option: (styles: object, { isFocused }) => ({
        ...styles,
        color: "#000000",
        backgroundColor: isFocused ? "#aaaaaa" : "#e8e8e8",
      }),
      menu: (styles: object) => ({
        ...styles,
        backgroundColor: "#2f2f2f",
      }),
    };

  return (
    <form className="w-max flex flex-col items-center justify-center pt-20 pb-14 gap-y-4">
      <div className="w-full flex flex-row gap-x-3 justify-center items-start">
        <input
          value={value}
          onChange={handleChangeInput}
          className="w-[420px] text-white text-start px-4 py-3.5 bg-gray-800 rounded-lg border border-rose-300 placeholder-rose-100 text-lg outline-0"
          placeholder="Busca por titulo o autor"
          type="search"
        />
        <Link
          href="/book/add"
          className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500  border-rose-300 border hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-rose-300 relative bg-slate-800 h-14 w-60  text-left p-3 text-gray-50 text-lg font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
        >
          Añade un libro
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center w-full text-white">
        <Select
          onChange={(val: SingleValue<any>) => handleChangeSelect(val?.value)}
          styles={stylesSelect}
          defaultValue={optionsSelect[0]}
          options={optionsSelect}
        />
        <SettingsSVG />
      </div>
    </form>
  );
}

export default Search;
