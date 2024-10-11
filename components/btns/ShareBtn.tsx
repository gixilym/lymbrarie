import { Component } from "@/utils/types";
import html2canvas from "html2canvas-pro";
import { Share2 as Icon } from "lucide-react";
import toast from "react-hot-toast";

function ShareBtn({ title }: { title: string }): Component {
  function shareInMobile(): string | Promise<void> {
    const info = {
      title,
      text: `${title} - Lymbrarie`,
      url: "https://lymbrarie.com",
    };

    return navigator.share
      ? navigator.share(info)
      : toast.error("Error al compartir");
  }

  function shareInDesktop(): void {
    const content = document.getElementById("screenshot") as HTMLElement;
    html2canvas(content, { backgroundColor: "rgb(2,6,23)" }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = title;
      link.click();
    });
  }

  function handleShare(): string | Promise<void> | void {
    const isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    return isMobile ? shareInMobile() : shareInDesktop();
  }

  return (
    <button
      onClick={handleShare}
      className="btn btn-square bg-slate-700/30 sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0 ">
      <Icon className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
    </button>
  );
}

export default ShareBtn;
