import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { MoveDown as DownIcon, MoveUp as UpIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

function Arrows(): Component {
  const [animations] = useLocalStorage("animations", "true");

  function toTop(): void {
    scrollTo({
      top: 0,
      behavior: animations ? "smooth" : "instant",
    });
  }

  function toBottom(): void {
    scrollTo({
      top: document.body.scrollHeight,
      behavior: animations ? "smooth" : "instant",
    });
  }

  return (
    <div className="absolute -top-10 lg:top-80 right-20 lg:-right-40 space-y-12">
      <UpIcon
        size={36}
        className={twMerge(
          scrollY > 0 ? "opacity-70 cursor-pointer" : "opacity-0",
          "fixed bg-gray-800 py-1 rounded-md w-8"
        )}
        onClick={toTop}
      />
      <DownIcon
        size={36}
        className="fixed cursor-pointer opacity-70 bg-gray-800 py-1 rounded-md w-8"
        onClick={toBottom}
      />
    </div>
  );
}

export default Arrows;
