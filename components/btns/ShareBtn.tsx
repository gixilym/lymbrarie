import type { Component } from "@/utils/types";
import { isNull } from "es-toolkit";
import html2canvas from "html2canvas-pro";
import { Share2 as Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function ShareBtn({ title, sharing, setSharing }: Props): Component {
  const [t] = useTranslation("global"),
    content = document.getElementById("screenshot") as HTMLElement,
    icons = document.getElementById("icons") as HTMLElement,
    isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    handleShare = () => (isMobile ? shareInMobile() : shareInDesktop());

  function shareInMobile(): string | Promise<void> {
    let file = null;
    html2canvas(content, { backgroundColor: "rgb(2,6,23)" }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const newFile = new File([image], `${title}.png`, { type: "image/png" });
      file = newFile;
    });

    if (isNull(file)) return "";

    const data: ShareData = {
      title,
      text: `${title} - Lymbrarie`,
      url: "https://lymbrarie.com",
      files: [file],
    };

    return navigator.share
      ? navigator.share(data)
      : toast.error(t("err-share"));
  }

  function shareInDesktop(): void {
    setSharing(!sharing);

    content.style.padding = "20px";
    content.style.border = "3px solid rgba(139,92,246,0.3)";
    content.style.height = "auto";
    icons.style.display = "none";

    const watermark = document.createElement("div");
    watermark.textContent = "lymbrarie.com";
    watermark.style.position = "absolute";
    watermark.style.bottom = "8px";
    watermark.style.right = "12px";
    watermark.style.fontSize = "16px";
    watermark.style.color = "rgba(255, 255, 255, 0.4)";
    watermark.style.zIndex = "999";
    content.appendChild(watermark);

    html2canvas(content, { backgroundColor: "rgb(2,6,23)" }).then(canvas => {
      const image = canvas.toDataURL("image/png");

      content.style.padding = "";
      content.style.border = "";
      content.style.height = "290px";
      icons.style.display = "flex";
      content.removeChild(watermark);

      const link = document.createElement("a");
      link.href = image;
      link.download = `${title}.png`;
      link.click();
    });
  }

  return (
    <button
      onClick={handleShare}
      className="btn btn-square bg-slate-700/30  sm:bg-slate-700/25 hover:bg-slate-700/50 border-2 border-slate-700/40 mb-1 mt-4 sm:mt-0 ">
      <Icon className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
    </button>
  );
}

export default ShareBtn;

interface Props {
  title: string;
  sharing: boolean;
  setSharing: React.Dispatch<React.SetStateAction<boolean>>;
}
