import type { Component } from "@/utils/types";
import { motion } from "framer-motion";
import { twJoin } from "tailwind-merge";

function DialogContainer({ children, divClass }: Props): Component {
  return (
    <motion.dialog
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="backdrop-blur-md w-full h-full absolute top-0 z-50 flex justify-center items-start bg-transparent"
    >
      <div
        className={twJoin(
          divClass,
          "modal-box max-w-[700px] w-full h-[550px] overflow-x-hidden rounded-2xl flex flex-col gap-y-3 border-2 border-rose-300/10 [&>label>input]:placeholder:text-gray-400 sm:mt-14"
        )}
      >
        {children}
      </div>
    </motion.dialog>
  );
}

export default DialogContainer;

interface Props {
  divClass?: string;
  children: React.ReactNode;
}
