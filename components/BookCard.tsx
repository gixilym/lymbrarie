import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { DEFAULT_COVER } from "@/utils/consts";
import type { BookData, Component, GoTo } from "@/utils/types";
import { type NextRouter } from "next/router";
import { useRouter } from "next/router";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";
import { formatTitle } from "@/utils/helpers";

function BookCard(props: Props): Component {
  const { data, showDetails } = props,
    { push }: NextRouter = useRouter(),
    [animations] = useLocalStorage("animations", true),
    title = formatTitle(data.title ?? ""),
    img: string = data.image || DEFAULT_COVER,
    [t] = useTranslation("global"),
    guest: string = (useRouter().query.guest as string) ?? "false",
    path: string = `/book/${title}?guest=${guest}`,
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
    const condition: boolean =
      // @ts-ignore
      typeof document.startViewTransition == "function" && animations;

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
        `${bg} rounded-md text-md w-28 py-0.5 text-center select-none`
      )}
    >
      {text.split(" ")[0]}
    </span>
  );
}

interface Props {
  data: BookData;
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
