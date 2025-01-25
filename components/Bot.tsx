import { BotMessageSquare as Icon } from "lucide-react";
import type { Component } from "@/utils/types";

function Bot(): Component {
  return (
    <Icon
      onClick={() => alert("Hello, I'm a bot!")}
      size={40}
      color="#ededed"
      className="fixed right-12 bottom-14 z-50 cursor-pointer"
    />
  );
}

export default Bot;
