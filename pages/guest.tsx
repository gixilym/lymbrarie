import IndexBanner from "@/components/banners/IndexBanner";
import ListSection from "@/components/ListSection";
import SearchIndex from "@/components/SearchIndex";
import { BOOK_STATES } from "@/utils/states";
import { animateOpacity } from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import type { Book, Component } from "@/utils/types";

export default function GuestPage(): Component {
  const [styles] = useSpring(() => animateOpacity(1, 1000));

  return (
    <animated.main
      style={styles}
      className="flex flex-col justify-start items-center w-full sm:max-w-[950px] h-full gap-y-6"
    >
      <IndexBanner username="Invitado" />
      <SearchIndex />
      <ListSection myBooks={guestBooks} isSearch={false} />
    </animated.main>
  );
}

const guestBooks: Book[] = [
  {
    id: "0",
    data: {
      author: "Jane Austen",
      gender: "Romance clásico",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
      isFav: false,
      loaned: "",
      notes: "Una de las novelas más queridas de la literatura inglesa, que explora temas de amor, clase social y matrimonio en la Inglaterra del siglo XIX.",
      owner: "guest",
      state: BOOK_STATES.READING.es,
      title: "Orgullo y Prejuicio",
    },
  },
  {
    id: "1",
    data: {
      author: "George Orwell",
      gender: "Distopía",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
      isFav: false,
      loaned: "",
      notes: "Una visión inquietante del futuro donde un gobierno totalitario vigila cada aspecto de la vida de las personas.",
      owner: "guest",
      state: BOOK_STATES.PENDING.es,
      title: "1984",
    },
  },
  {
    id: "2",
    data: {
      author: "Dan Brown",
      gender: "Thriller",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
      isFav: true,
      loaned: "",
      notes: "Un thriller lleno de suspense que combina arte, historia y misterio en una búsqueda del Santo Grial.",
      owner: "guest",
      state: BOOK_STATES.LENT.es,
      title: "El Código Da Vinci",
    },
  },
  {
    id: "3",
    data: {
      author: "J.K. Rowling",
      gender: "Fantasía",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg",
      isFav: false,
      loaned: "",
      notes: "",
      owner: "guest",
      state: BOOK_STATES.READ.es,
      title: "Harry Potter y la Piedra Filosofal",
    },
  },
];
