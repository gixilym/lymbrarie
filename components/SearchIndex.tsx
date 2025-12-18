import AddBookBtn from "./btns/AddBookBtn";
import LogInBtn from "./btns/LogInBtn";
import Select from "react-select";
import useGuest from "@/hooks/useGuest";
import useIsMobile from "@/hooks/useIsMobile";
import { menuAtom, searchAtom, stateAtom } from "@/utils/atoms";
import { selectStyles } from "@/utils/helpers";
import { twMerge } from "tailwind-merge";
import { useRecoilState } from "recoil";
import type {
  Component,
  EventSelect,
  Handler,
  InputEvent,
  SelectOpt,
} from "@/utils/types";

function SearchIndex(): Component {
  const { isGuest } = useGuest(),
    [value, setValue] = useRecoilState<string>(searchAtom),
    [selectVal, setSelectStateVal] = useRecoilState<string>(stateAtom),
    [menuIsOpen] = useRecoilState(menuAtom),
    { isMobile } = useIsMobile(),
    handleSearch: Handler<InputEvent, void> = (e: InputEvent) =>
      setValue(e.target.value),
    handleSelect: Handler<string, void> = (val: string) =>
      setSelectStateVal(val),
    options: SelectOpt = [
      { value: "", label: "Todo" },
      {
        value: "Leyendo",
        label: "Leyendo",
      },
      { value: "Leído", label: "Leído" },
      { value: "Pendiente", label: "Pendiente" },
      {
        value: "Prestado",
        label: "Prestado",
      },
      {
        value: "Abandonado",
        label: "Abandonado",
      },
      {
        value: "A medias",
        label: "A medias",
      },
    ] as const,
    getPlaceholder = (): string => {
      const option = options.find(opt => opt.value === selectVal);
      return option ? option.label : "Todo";
    };

  return (
    <div
      className={twMerge(
        menuIsOpen ? "hidden" : "flex",
        "w-full mb-0 sm:mb-10 flex-col items-center gap-y-8"
      )}
    >
      <form className="w-full max-w-3xl flex flex-col items-center justify-center select-none px-6 sm:px-0">
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="join w-full sm:w-auto max-w-xl">
            <input
              id="input-search"
              value={value}
              onChange={handleSearch}
              className="focus:outline-0 focus:border-rose-300/10 backdrop-blur-[2px] input join-item w-[230px] sm:w-[300px] h-14 bg-slate-800/60 border-2 border-rose-300/10 placeholder:text-slate-300/70 text-sm sm:text-lg text-slate-300 placeholder:w-full"
              placeholder="Busca en tu biblioteca"
              type="search"
              autoFocus
            />
            <Select
              className="join-item capitalize text-xs md:text-[17px] text-slate-900"
              id="select-state"
              isSearchable={false}
              options={options}
              placeholder={getPlaceholder()}
              value={selectVal}
              styles={selectStyles(selectVal == "", false, isMobile)}
              onChange={(e: EventSelect) => handleSelect(e.value)}
            />
          </div>

          {isGuest ? <LogInBtn /> : <AddBookBtn />}
        </div>
      </form>
    </div>
  );
}

export default SearchIndex;
