import { DEFAULT_COVER } from "@/utils/store";
import type { Book, Component } from "@/utils/types";
import { motion } from "framer-motion";
import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import CardWithDetails from "./CardWithDetails";
import CardWithOutDetails from "./CardWithoutDetails";

function BookCard({ data, showDetails }: Props): Component {
  const router: NextRouter = useRouter(),
    formatTitle: string = data.title?.replaceAll(" ", "_") ?? "",
    img: string = data.image || DEFAULT_COVER,
    [t] = useTranslation("global"),
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

  function goTo(): void {
    router.push(`/book/${formatTitle}`);
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
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className={twMerge(
        showDetails && "absolute bottom-2 right-2",
        `${bg} rounded-md text-md w-28 py-0.5 text-center`
      )}
    >
      {text.split(" ")[0]}
    </motion.span>
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
