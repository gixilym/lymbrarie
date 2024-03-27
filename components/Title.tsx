import { useSearchParams, useRouter } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { twMerge } from "tailwind-merge";

function Title() {
  const params: Params = useSearchParams();
  const theme: string = params.get("theme");
  return (
    <p
      className={twMerge(
        theme == "pastel" ? "text-black" : "text-white/90",
        "text-xl font-public tracking-wide"
      )}
    >
      Lymbrarie
    </p>
  );
}

export default Title;
