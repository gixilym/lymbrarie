"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookProps {
  id: string;
  title: string;
  author: string;
  state: string;
  image?: string;
}

function BookCard({ title, author, image }: BookProps) {
  const router: AppRouterInstance = useRouter();

  return (
    <li
      onClick={() => router.push(`/book/${title}`)}
      className="flex flex-row justify-between w-[300px] items-start gap-x-2 pr-0.5 bg-gradient-to-b from-slate-800/80 to-slate-900/20 border-2 border-rose-300/5 h-[135px] cursor-pointer duration-150 rounded-md hover:scale-105 hover:bg-slate-800"
    >
      <Image
        src={
          image
            ? image
            : "https://res.cloudinary.com/dgs55s8qh/image/upload/v1707771560/ycuxmhib7vzjxebqcp5f.jpg"
        }
        alt="Book cover"
        className="w-[100px] object-fill h-full overflow-hidden rounded-bl rounded-tl"
        width={60}
        height={60}
        priority
      />
      <div className="flex flex-col items-start justify-between py-1.5 w-[200px] h-full">
        <p className="font-public font-light text-slate-100 ">{title}</p>
        <p className="text-sm text-slate-300">{author}</p>
      </div>
    </li>
  );
}

export default BookCard;
