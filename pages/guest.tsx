import IndexBanner from "@/components/banners/IndexBanner";
import ListSection from "@/components/ListSection";
import SearchIndex from "@/components/SearchIndex";
import { animateOpacity } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import type { Book, Component, Translate } from "@/utils/types";

export default function GuestPage(): Component {
  const [t] = useTranslation("global");
  const [styles] = useSpring(() => animateOpacity(1, 1000));

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <IndexBanner username={t("guest")} />
      <SearchIndex />
      <ListSection myBooks={getGuestBooks(t)} isSearch={false} />
    </animated.main>
  );
}

function getGuestBooks(t: Translate): Book[] {
  return [
    {
      id: "0",
      data: {
        author: "Jane Austen",
        gender: t("gender-book-0"),
        image:
          "https://res.cloudinary.com/ducssjlkl/image/upload/v1756501519/z9ezuo9vxi5lfqk38eqp_p9npzv.webp",
        isFav: false,
        loaned: "",
        notes: t("notes-book-0"),
        owner: "guest",
        state: "Reading",
        title: t("name-book-0"),
      },
    },
    {
      id: "1",
      data: {
        author: "George Orwell",
        gender: t("dystopia"),
        image:
          "https://res.cloudinary.com/ducssjlkl/image/upload/v1756501610/nj34sktvxjvjf0nqjutr_szsfdy.webp",
        isFav: false,
        loaned: "",
        notes: t("notes-book-1"),
        owner: "guest",
        state: "Pending",
        title: "1984",
      },
    },
    {
      id: "2",
      data: {
        author: "Dan Brown",
        gender: "Thriller",
        image:
          "https://res.cloudinary.com/ducssjlkl/image/upload/v1756501595/izddg9gjnjrpvkrxz4it_jze3th.webp",
        isFav: true,
        loaned: "",
        notes: t("notes-book-2"),
        owner: "guest",
        state: "Lent",
        title: t("name-book-2"),
      },
    },
    {
      id: "3",
      data: {
        author: "J.K. Rowling",
        gender: t("fantasy"),
        image:
          "https://res.cloudinary.com/ducssjlkl/image/upload/v1756501577/f1uc15e9qzttwemahtq8_kqrhpf.webp",
        isFav: false,
        loaned: "",
        notes: t(""),
        owner: "guest",
        state: "Read",
        title: t("name-book-3"),
      },
    },
  ];
}
