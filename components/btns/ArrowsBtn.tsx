import useLocalStorage from "@/utils/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { throttle } from "lodash";
import { MoveDown as DownIcon, MoveUp as UpIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Arrows(): Component {
  const [animations] = useLocalStorage("animations", true),
    [showDownBtn, setShowDownBtn] = useState<boolean>(true),
    [showUpBtn, setShowUpBtn] = useState<boolean>(false),
    [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  const handleScroll = throttle(() => {
    const isFarDown: boolean = scrollY > 600,
      h: number = document.documentElement.scrollHeight,
      isNearBottom: boolean = innerHeight + scrollY >= h - 700;
    setShowDownBtn(!isNearBottom);
    setShowUpBtn(isFarDown);
  }, 700);

  useEffect(() => {
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  if (!isClient) return <></>;

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
      {showUpBtn ? (
        <UpIcon
          size={36}
          className="fixed bg-gray-800 py-1 rounded-md w-8 opacity-70 cursor-pointer"
          onClick={toTop}
        />
      ) : (
        <div className="fixed w-8 h-10" />
      )}
      {showDownBtn ? (
        <DownIcon
          size={36}
          className="fixed cursor-pointer opacity-70 bg-gray-800 py-1 rounded-md w-8"
          onClick={toBottom}
        />
      ) : (
        <div className="fixed w-8 h-10" />
      )}
    </div>
  );
}

export default Arrows;
