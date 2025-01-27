import html2canvas from "html2canvas-pro";
import { Share2 as Icon } from "lucide-react";
import type { Component } from "@/utils/types";

function ShareBtn({ title }: Props): Component {
  const content = document.getElementById("screenshot") as HTMLElement,
    icons = document.getElementById("icons") as HTMLElement,
    isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) return <></>;

  function shareInDesktop(): void {
    content.style.padding = "20px";
    content.style.border = "3px solid rgba(139,92,246,0.3)";
    content.style.height = "auto";
    icons.style.display = "none";

    const watermark = document.createElement("div") as HTMLDivElement;
    watermark.textContent = "lymbrarie.com";
    watermark.style.position = "absolute";
    watermark.style.bottom = "8px";
    watermark.style.right = "12px";
    watermark.style.fontSize = "16px";
    watermark.style.color = "rgba(255, 255, 255, 0.4)";
    watermark.style.zIndex = "999";
    content.appendChild(watermark);

    html2canvas(content, { backgroundColor: "rgb(2,6,23)" }).then(canvas => {
      const image: string = canvas.toDataURL("image/png");

      content.style.padding = "";
      content.style.border = "";
      content.style.height = "290px";
      icons.style.display = "flex";
      content.removeChild(watermark);

      const link = document.createElement("a") as HTMLAnchorElement;
      link.href = image;
      link.download = `${title}.png`;
      link.click();
    });
  }

  return (
    <button
      onClick={shareInDesktop}
      className="btn btn-square bg-slate-700/30  sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0 "
    >
      <Icon className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
    </button>
  );
}

export default ShareBtn;

interface Props {
  title: string;
}
