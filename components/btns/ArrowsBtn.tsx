import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Book, Component } from "@/utils/types";
import { MoveDown as DownIcon, MoveUp as UpIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Arrows(): Component {
  const [isClient, setIsClient] = useState<boolean>(false),
    [animations] = useLocalStorage("animations", true),
    [cacheBooks] = useLocalStorage("cacheBooks", null) as [Book[] | null],
    dontShow: boolean = !Array.isArray(cacheBooks) || cacheBooks.length < 12;

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

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

  if (dontShow) return <></>;
  return (
    <div className="absolute -top-10 lg:top-80 right-20 lg:-right-40 space-y-12">
      <UpIcon
        size={36}
        className="fixed bg-gray-800 py-1 rounded-md w-8 opacity-70 cursor-pointer"
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
