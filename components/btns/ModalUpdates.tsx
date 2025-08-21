import DialogContainer from "../DialogContainer";
import useLocalStorage from "@/hooks/useLocalStorage";
import { delay } from "es-toolkit";
import { Fragment, useEffect, useState } from "react";
import { HandMetalIcon } from "lucide-react";
import { len, pathIs } from "@/utils/helpers";
import { PAGES } from "@/utils/consts";
import type { Component } from "@/utils/types";
import HeaderPopUp from "../HeaderPopUp";

export default function ModalUpdates({
  title,
  content,
  timestamp,
}: any): Component {
  const [show, setShow] = useState<boolean>(false),
    [lastUpdate, setLastUpdate] = useLocalStorage("last-update", ""),
    hidden: boolean =
      lastUpdate == timestamp || pathIs(PAGES.LOGIN) || pathIs(PAGES.GUEST);

  useEffect(() => {
    if (hidden) return;
    (async function () {
      await delay(3000);
      setShow(true);
    })();
  }, [timestamp]);

  function handleClose(): void {
    setLastUpdate(timestamp);
    setShow(false);
  }

  if (!show) return <></>;

  return (
    <div onClick={handleClose}>
      <DialogContainer id="updates" divClass="items-center">
        <HeaderPopUp icon={<HandMetalIcon size={30} />} title={title} />
        <p className="w-full text-lg tracking-wide text-start sm:px-6 text-pretty text-slate-300">
          {content?.split("//").map((text, index) => (
            <Fragment key={index}>
              {text}
              {index != len(content.split("//")) - 1 && <br />}
            </Fragment>
          ))}
        </p>

        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleClose}
            className="bg-green-500 border-2 border-green-600 hover:bg-green-400 text-xl text-black px-6 py-2 rounded-md w-max"
          >
            ¡Fantástico!
          </button>
        </div>
      </DialogContainer>
    </div>
  );
}
