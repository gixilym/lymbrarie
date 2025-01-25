import Image from "next/image";
import { CLOUDINARY_URL } from "@/utils/consts";
import { coverAtom } from "@/utils/atoms";
import { Image as ImgIcon } from "lucide-react";
import { notification } from "@/utils/notifications";
import { twMerge } from "tailwind-merge";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import type { Component } from "@/utils/types";

function InputCover({ isLoading, handleImage }: Props): Component {
  const [coverLoading, setCoverLoading] = useRecoilState(coverAtom),
    loading: boolean = isLoading || coverLoading,
    onDrop = useCallback((file: any) => console.log(file), []),
    { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop }),
    [errImg, setErrImg] = useState<boolean>(false),
    showImg: boolean = !errImg && acceptedFiles[0] && !loading,
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
      body.append("upload_preset", "arjhb0vs");

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
      className={twMerge(
        loading ? "bg-base-200" : "bg-transparent input-bordered",
        "input border-dashed border-[1.5px] flex items-center sm:text-xl w-full text-sm h-14 mb-1 cursor-pointer relative"
      )}
      {...getRootProps()}
    >
      <ImgIcon size={18} className="mt-0.5 mr-2" />
      <input
        {...getInputProps()}
        accept="image/*"
        multiple={false}
        name="image"
        id="image-input"
        disabled={loading}
      />

      {errImg ? (
        <p
          className={twMerge(
            loading ? "opacity-20" : "opacity-100",
            "text-red-200 pl-2 sm:text-xl text-sm"
          )}
        >
          {t("err-loading-cover")}
        </p>
      ) : (
        <p
          className={twMerge(
            loading ? "opacity-30" : "opacity-100",
            "sm:text-xl text-sm select-none text-center pl-2 tracking-wide text-slate-400"
          )}
        >
          {acceptedFiles[0] && !coverLoading
            ? t("cover-list")
            : coverLoading
            ? t("generating-cover")
            : t("select-cover-image")}
        </p>
      )}
      {showImg && (
        <Image
          width={30}
          height={30}
          src={URL.createObjectURL(acceptedFiles[0])}
          alt="Cover"
          className={twMerge(
            loading ? "opacity-30" : "opacity-100",
            "w-8 h-full py-2.5 absolute top-0 right-6"
          )}
        />
      )}
    </div>
  );
}

export default InputCover;

interface Props {
  isLoading: boolean | undefined;
  handleImage: (newUrl: string) => void;
}
