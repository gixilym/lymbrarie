import type { Card, Component } from "@/utils/types";
import { motion } from "framer-motion";
import { Ampersand as GenderIcon, User as UserIcon } from "lucide-react";
import Image from "next/image";

function CardWithDetails(props: Card): Component {
  const { title, formatState, img, gender, author, onClick } = props;

  return (
    <motion.li
      whileHover={{ scale: 1.03 }}
      initial={{ y: "-300px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="mx-4 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-sm border-r-2 border-b-2 border-rose-300/10 hover:border-rose-300/20 flex flex-row justify-start items-start w-full sm:w-[580px] gap-x-4 rounded-xl relative h-28"
    >
      {formatState()}
      {img && (
        <Image
          priority
          src={img}
          width={60}
          height={100}
          alt="cover"
          className="w-[70px] h-full aspect-[3/5] rounded-tl-lg rounded-bl-lg"
        />
      )}
      <div className="flex flex-col justify-between items-start gap-y-1 h-full w-[200px] sm:w-[490px] py-2">
        <p
          title={title}
          className="w-full font-public text-lg sm:text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {title}
        </p>

        <div className="pl-1 w-full">
          {author && (
            <div className="flex flex-row justify-start items-center gap-x-2">
              <UserIcon size={16} />
              <p>{author}</p>
            </div>
          )}
          {gender && (
            <div className="flex flex-row justify-start items-center gap-x-2">
              <GenderIcon size={16} />
              <p>{gender}</p>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default CardWithDetails;
