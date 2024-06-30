import { useEffect, useRef, useState } from "react";
import { Toaster as ToastNotification } from "react-hot-toast";
import { twJoin, twMerge } from "tailwind-merge";

function DialogContainer(props: Props) {
  const { children, divClass } = props;
  const ref = useRef<HTMLDialogElement | null>(null);
  const [isVisible] = useState(true);

  useEffect(() => {
    const dialogElement = ref.current;
    if (dialogElement) {
      dialogElement.style.display = "flex";
    }
  }, []);

  return (
    <dialog
      ref={ref}
      className={twMerge(
        isVisible ? "dialog-container" : "dialog-container fade-out",
        "backdrop"
      )}
    >
      <div
        className={twJoin(
          divClass,
          "modal-box max-w-[700px] w-full h-[550px] overflow-x-hidden rounded-2xl flex flex-col gap-y-3 border-2 border-rose-300/10 [&>label>input]:placeholder:text-gray-400 sm:mt-14"
        )}
      >
        {children}
      </div>
      <ToastNotification reverseOrder={false} position="top-right" />
    </dialog>
  );
}

export default DialogContainer;

interface Props {
  divClass?: string;
  children: React.ReactNode;
}
