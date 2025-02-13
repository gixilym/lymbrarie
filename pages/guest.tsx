import icon from "@/public/favicon.ico";
import ListSection from "@/components/ListSection";
import PopUps from "@/components/PopUps";
import SearchIndex from "@/components/SearchIndex";
import useLocalStorage from "@/hooks/useLocalStorage";
import { animated, useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import { useUser, withUser } from "next-firebase-auth";
import type { Book, Component, Translate } from "@/utils/types";

export default withUser()(GuestMode);

function GuestMode(): Component {
  const user = useUser(),
    [t] = useTranslation("global"),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    }));

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <SearchIndex UID={user?.id} />
      <ListSection myBooks={getGuestBooks(t)} />
      <PopUps
        profileImg={icon as any}
        profileName={t("guest")}
        UID="Guest"
        isGuest
      />
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
        image: t("cover-book-0"),
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
          "https://res.cloudinary.com/dgs55s8qh/image/upload/v1738724385/nj34sktvxjvjf0nqjutr.webp",
        isFav: true,
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
        image: t("cover-book-2"),
        isFav: false,
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
        image: t("cover-book-3"),
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
