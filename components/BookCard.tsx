import defaultCover from "@/public/cover.webp";
import { formatTitle } from "@/utils/helpers";
import type { BookData, Component } from "@/utils/types";
import { useRouter, type NextRouter } from "next/router";
import fnState from "./BookState";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";

function BookCard({ data, showDetails }: Props): Component {
  const { push, pathname }: NextRouter = useRouter(),
    title = formatTitle(data.title ?? ""),
    isGuest: boolean = pathname.includes(`/guest`),
    img: string = data.image || defaultCover.src,
    onClick = (): Promise<boolean> => {
      if (isGuest) return guestPath();
      return push(`/book/${title}`);
    },
    formatState = (): Component => fnState(data.state ?? "", showDetails),
    withDetails: Details = {
      title: data.title ?? "",
      onClick,
      formatState,
      img,
      gender: data.gender,
      author: data.author,
    } as const,
    withOutDetails: Details = {
      onClick,
      formatState,
      title: data.title ?? "",
    } as const;

  function guestPath(): Promise<boolean> {
    switch (data.title) {
      case "Orgullo y Prejuicio":
        return push("/guest/0");

      case "Pride and Prejudice":
        return push("/guest/0");

      case "1984":
        return push("/guest/1");

      case "El Código Da Vinci":
        return push("/guest/2");

      case "The Da Vinci Code":
        return push("/guest/2");

      case "Harry Potter y la Piedra Filosofal":
        return push("/guest/3");

      case "Harry Potter and the Philosopher's Stone":
        return push("/guest/3");

      default:
        return push("/login");
    }
  }

  if (showDetails) return <CardWithDetails {...withDetails} />;
  return <CardWithOutDetails {...withOutDetails} />;
}

export default BookCard;

interface Props {
  data: BookData;
  showDetails: boolean;
}

interface Details {
  onClick: () => Promise<boolean>;
  title: string;
  formatState: () => Component;
  img?: string;
  gender?: string;
  author?: string;
}
