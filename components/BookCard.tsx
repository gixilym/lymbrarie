import Image from "next/image";
import { motion } from "framer-motion";

interface BookProps {
  id: string;
  title: string;
  author: string;
  state: string;
  image?: string;
  gender?: string;
  showDetails: boolean;
}

function BookCard(props: BookProps) {
  const { title, author, image, state, gender, showDetails = false } = props;
  const img = image ?? defaultImg;

  function formatState() {
    switch (state) {
      case "Reading":
        return (
          <span className="bg-green-600/30 rounded-md text-md  w-32 py-0.5 text-center">
            Leyendo
          </span>
        );

      case "Read":
        return (
          <span className="bg-yellow-600/30 rounded-md text-md w-32 py-0.5 text-center">
            Leído
          </span>
        );

      case "Pending":
        return (
          <span className="bg-orange-600/30 rounded-md text-md w-32 py-0.5 text-center">
            Pendiente
          </span>
        );
    }
  }

  return (
    <motion.li
      initial={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      exit={{ transition: { duration: 0.2 } }}
      className="flex flex-col justify-center items-start w-[600px] gap-y-1.5 border border-rose-100/10 rounded-xl p-4"
    >
      <div className="flex justify-center items-center gap-x-2 w-full">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 12.0002C5.00024 8.66068 7.35944 5.78639 10.6348 5.1351C13.9102 4.48382 17.1895 6.23693 18.4673 9.32231C19.7451 12.4077 18.6655 15.966 15.8887 17.8212C13.1119 19.6764 9.41127 19.3117 7.05 16.9502C5.73728 15.6373 4.99987 13.8568 5 12.0002Z"
            stroke="#dbdbdbac"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 10.0002L13 12.0002L11 14.0002"
            stroke="#dbdbdbac"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          title={title}
          className="w-full font-public text-xl font-ligth overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {title}
        </p>
        {formatState()}
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex justify-start items-end gap-x-3"
        >
          <Image src={img} width={60} height={100} alt="cover book" />
          <div>
            <p>{gender}</p>
            <p>{author}</p>
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

export default BookCard;

const defaultImg =
  "https://res.cloudinary.com/dgs55s8qh/image/upload/v1707771560/ycuxmhib7vzjxebqcp5f.jpg";
