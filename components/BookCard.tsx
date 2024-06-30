import { DEFAULT_COVER } from "@/utils/store";
import type { Book, Component, GoTo } from "@/utils/types";
import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";

function BookCard({ data, showDetails }: Props): Component {
  const { push }: NextRouter = useRouter(),
    formatTitle: string = data.title?.replaceAll(" ", "_") ?? "",
    img: string = data.image || DEFAULT_COVER,
    [t] = useTranslation("global"),
    path: string = `/book/${formatTitle}`,
    withProps: Details = {
      onClick: goTo,
      title: data.title ?? "",
      formatState,
      img,
      gender: data.gender,
      author: data.author,
    },
    withOutProps: Details = {
      onClick: goTo,
      title: data.title ?? "",
      formatState,
    };

  function goTo(): GoTo {
    const animationsEnabled: boolean = true;
    const condition: boolean =
      // @ts-ignore
      typeof document.startViewTransition == "function" && animationsEnabled;

    return condition
      ? // @ts-ignore
        document.startViewTransition(() => flushSync(() => push(path)))
      : push(path);
  }

  function formatState(): Component {
    switch (data.state) {
      case "Reading":
        return (
          <BookState
            text={t("new-book-reading")}
            bg="bg-yellow-600/30"
            showDetails={showDetails}
          />
        );

      case "Read":
        return (
          <BookState
            text={t("new-book-read")}
            bg="bg-green-600/30"
            showDetails={showDetails}
          />
        );

      case "Pending":
        return (
          <BookState
            text={t("new-book-pending")}
            bg="bg-orange-600/30"
            showDetails={showDetails}
          />
        );

      case "Borrowed":
        return (
          <BookState
            text={t("loanedto")}
            bg="bg-orange-600/30"
            showDetails={showDetails}
          />
        );

      default:
        return <></>;
    }
  }

  if (showDetails) return <CardWithDetails {...withProps} />;
  return <CardWithOutDetails {...withOutProps} />;
}

export default BookCard;

function BookState({ showDetails, text, bg }: State): Component {
  return (
    <span
      className={twMerge(
        showDetails && "absolute bottom-2 right-2",
        `${bg} rounded-md text-md w-28 py-0.5 text-center`
      )}
    >
      {text.split(" ")[0]}
    </span>
  );
}

interface Props {
  data: Book;
  showDetails: boolean;
}

interface State {
  showDetails: boolean;
  text: string;
  bg: string;
}

interface Details {
  onClick: () => void;
  title: string;
  formatState: () => Component;
  img?: string;
  gender?: string;
  author?: string;
}
