import BookCardSearched from "./BookCardSearched";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";
import Cover from "@/public/cover.webp";
import fnState from "./BookState";
import useGuest from "@/hooks/useGuest";
import { formatTitle, pathIs } from "@/utils/helpers";
import { PAGES } from "@/utils/consts";
import { useTranslation } from "react-i18next";
import type { BookData, Component } from "@/utils/types";
import { useRouter, type NextRouter } from "next/router";

function BookCard({ data, showDetails }: Props): Component {
  const { push }: NextRouter = useRouter(),
    [t] = useTranslation("global"),
    title: string = formatTitle(data.title ?? ""),
    { isGuest } = useGuest(),
    img: string = data.image || Cover.src,
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
    } as const,
    searchedProps: SearchedProps = {
      title: data.title ?? "",
      author: data.author ?? t("unknown-author"),
      image: img,
      notes: data.notes ?? "...",
      owner: data.owner ?? t("guest"),
      gender: data.gender ?? "",
      isFav: data.isFav ?? false,
      loaned: data.loaned ?? "",
      state: data.state ?? "",
    } as const;

  function onClick(): Promise<boolean> {
    if (isGuest) return guestPath();
    return push(`${PAGES.BOOK}/${title}`);
  }

  function guestPath(): Promise<boolean> {
    switch (data.title) {
      case "Orgullo y Prejuicio":
        return push(`${PAGES.GUEST}/0`);

      case "Pride and Prejudice":
        return push(`${PAGES.GUEST}/0`);

      case "1984":
        return push(`${PAGES.GUEST}/1`);

      case "El Código Da Vinci":
        return push(`${PAGES.GUEST}/2`);

      case "The Da Vinci Code":
        return push(`${PAGES.GUEST}/2`);

      case "Harry Potter y la Piedra Filosofal":
        return push(`${PAGES.GUEST}/3`);

      case "Harry Potter and the Philosopher's Stone":
        return push(`${PAGES.GUEST}/3`);

      default:
        return push(PAGES.LOGIN);
    }
  }

  function renderCard(): Component {
    switch (true) {
      case pathIs(PAGES.SEARCH):
        return <BookCardSearched {...searchedProps} />;

      case showDetails:
        return <CardWithDetails {...withDetails} />;

      default:
        return <CardWithOutDetails {...withOutDetails} />;
    }
  }

  return renderCard();
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

interface SearchedProps {
  title: string;
  author: string;
  notes: string;
  image: string;
  owner: string;
  gender: string;
  isFav: boolean;
  loaned: string;
  state: string;
}
