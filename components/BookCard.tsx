import defaultCover from "@/public/cover.webp";
import { formatTitle } from "@/utils/helpers";
import type { BookData, Component } from "@/utils/types";
import { useRouter, type NextRouter } from "next/router";
import fnState from "./BookState";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";

function BookCard({ data, showDetails }: Props): Component {
  const { push }: NextRouter = useRouter(),
    title = formatTitle(data.title ?? ""),
    img: string = data.image || defaultCover.src,
    onClick = (): Promise<boolean> => push(`/book/${title}`),
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
