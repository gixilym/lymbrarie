import Image from "next/image";
import { CLOUDINARY_URL } from "@/utils/consts";
import { coverAtom } from "@/utils/atoms";
import { Image as ImgIcon } from "lucide-react";
import { notification } from "@/utils/notifications";
import { twJoin, twMerge } from "tailwind-merge";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

const preset: string = String(process.env.NEXT_PUBLIC_PRESET);

export default function InputCover(props: Props): Component {
  const { isLoading, handleImage, isEditing } = props,
    [coverLoading, setCoverLoading] = useRecoilState(coverAtom),
    loading: boolean = isLoading || coverLoading,
    onDrop = useCallback((file: any) => console.info(file), []),
    { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop }),
    [errImg, setErrImg] = useState<boolean>(false),
    showImg: boolean = !errImg && acceptedFiles[0] && !loading,
    isSpanish: boolean = useTranslation("global").i18n.language == "es",
    [t] = useTranslation("global");

  useEffect(() => {
    if (acceptedFiles[0]) saveImg();
  }, [acceptedFiles]);

  async function saveImg(): Promise<void> {
    setErrImg(false);
    setCoverLoading(true);

    const body: FormData = new FormData();

    try {
      body.append("file", acceptedFiles[0]);
      body.append("upload_preset", preset);

      const res: Response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body,
        }),
        data: { secure_url: string } = await res.json(),
        url: string = data.secure_url;
      handleImage(url);
    } catch (err: any) {
      setErrImg(true);
      notification("error", t("err-loading-cover"));
      console.error(`catch 'saveImg' ${err.message}`);
    } finally {
      setCoverLoading(false);
    }
  }

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        "flex items-center w-full bg-slate-900/40 backdrop-blur-sm rounded-xl px-4 h-14 border-[1.5px] border-violet-500/20 border-dashed hover:border-violet-500/30 transition-colors cursor-pointer relative",
        showImg && "border-r-0",
        loading &&
          "border-violet-500/5 pointer-events-none cursor-default opacity-50"
      )}
    >
      <ImgIcon
        size={18}
        className={twJoin(
          "text-violet-300 mr-3 flex-shrink-0",
          coverLoading && "animate-spin "
        )}
      />

      <input
        {...getInputProps()}
        accept="image/*"
        multiple={false}
        name="image"
        id="image-input"
        disabled={loading}
        className="hidden disabled:disabled:opacity-50"
      />

      {errImg ? (
        <p className="text-red-300 text-lg">{t("err-loading-cover")}</p>
      ) : (
        <p
          className={twMerge(
            isSpanish ? "text-sm sm:text-lg" : "text-lg",
            "text-slate-300 select-none"
          )}
        >
          {acceptedFiles[0] && !coverLoading
            ? t("cover-list")
            : coverLoading
            ? t("generating-cover")
            : isEditing
            ? t("change-cover-image")
            : t("select-cover-image")}
        </p>
      )}

      {showImg && (
        <div className="absolute right-0 h-full p-1 bg-violet-500/10 rounded-r-xl border-r border-violet-500/20">
          <Image
            width={30}
            height={30}
            src={URL.createObjectURL(acceptedFiles[0])}
            alt="cover"
            className={twJoin(
              "w-8 h-full object-cover rounded-md",
              loading && "opacity-50"
            )}
          />
        </div>
      )}
    </div>
  );
}

interface Props {
  isLoading: boolean | undefined;
  handleImage: (newUrl: string) => void;
  isEditing: boolean;
}
