import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

function InputSearch({ query, setQuery, isLoading }: Props) {
  const [t] = useTranslation("global");

  return (
    <div className="w-full flex justify-center items-center">
      <div className="join w-full max-w-lg">
        <input
          disabled={isLoading}
          id="input-api-books"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t("placeholder-search")}
          type="search"
          autoFocus
          className="join-item w-full h-14 bg-slate-800/70 backdrop-blur-sm border-2 border-violet-500/60 rounded-l-xl focus:outline-none focus:border-violet-500/40 transition-colors placeholder:text-slate-300/90 text-lg px-6 border-r-0"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="disabled:bg-violet-500/50 join-item btn h-14 px-8 bg-violet-500/50 hover:bg-violet-500/60 border-2 border-violet-500/20 hover:border-violet-500/40 backdrop-blur-sm rounded-r-xl border-l-0 transition-all"
        >
          <SearchIcon size={24} className="text-violet-200" />
        </button>
      </div>
    </div>
  );
}

export default InputSearch;

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}
