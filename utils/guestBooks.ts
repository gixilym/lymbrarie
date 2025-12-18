interface GuestBookData {
  title: string;
  image: string;
  notes: string;
  author: string;
  gender: string;
  state: string;
  loanedTo?: string;
}

export const GUEST_BOOKS: Record<string, GuestBookData> = {
  "0": {
    title: "Orgullo y Prejuicio",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    notes: "Una de las novelas más queridas de la literatura inglesa, que explora temas de amor, clase social y matrimonio en la Inglaterra del siglo XIX.",
    author: "Jane Austen",
    gender: "Romance clásico",
    state: "Leyendo",
  },
  "1": {
    title: "1984",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    notes: "Una visión inquietante del futuro donde un gobierno totalitario vigila cada aspecto de la vida de las personas.",
    author: "George Orwell",
    gender: "Distopía",
    state: "Pendiente",
  },
  "2": {
    title: "El Código Da Vinci",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
    notes: "Un thriller lleno de suspense que combina arte, historia y misterio en una búsqueda del Santo Grial.",
    author: "Dan Brown",
    gender: "Thriller",
    state: "Prestado",
    loanedTo: "María",
  },
  "3": {
    title: "Harry Potter y la Piedra Filosofal",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg",
    notes: "",
    author: "J. K. Rowling",
    gender: "Fantasía",
    state: "Leído",
  },
};
