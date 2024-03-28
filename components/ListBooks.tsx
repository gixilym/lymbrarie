"use client";
import BookCard from "./BookCard";
import { inputSearch, checkboxValue } from "@/utils/store";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

function ListBooks({ myBooks }: { myBooks: object[] }) {
  const [getValue] = useRecoilState(inputSearch),
    [showDetails, setShowDetails] = useState<boolean>(false),
    [getSelectStateValue] = useRecoilState(checkboxValue);

  function allBooks() {
    const all = myBooks.map((book: any) => (
      <BookCard
        showDetails={showDetails}
        key={book.title}
        id={book.id}
        title={book.title}
        author={book.author}
        state={book.state}
        image={book.image}
        gender={book.gender}
      />
    ));

    return all.length > 0 ? all : "¡Añade tu primer libro!";
  }

  function filterByValue() {
    const value = getValue.trim().toLowerCase();
    const booksFiltered = myBooks
      .filter(
        (book: any) =>
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.author.toLowerCase().includes(value.toLowerCase())
      )
      .map((book: any) => (
        <BookCard
          showDetails={showDetails}
          key={book.title}
          id={book.id}
          title={book.title}
          author={book.author}
          state={book.state}
          image={book.image}
          gender={book.gender}
        />
      ));
    return booksFiltered.length > 0 ? (
      booksFiltered
    ) : (
      <p className=" text-gray-200/70 text-2xl font-public font-normal">
        Sin coincidencias...
      </p>
    );
  }

  function filterByCheck() {
    const booksFiltered = myBooks
      .filter(
        (book: any) =>
          book.state.toLowerCase() == getSelectStateValue.toLowerCase()
      )
      .map((book: any) => (
        <BookCard
          showDetails={showDetails}
          key={book.title}
          id={book.id}
          title={book.title}
          author={book.author}
          state={book.state}
          image={book.image}
          gender={book.gender}
        />
      ));

    return booksFiltered.length > 0 ? (
      booksFiltered
    ) : (
      <p className=" text-gray-200/70 text-2xl font-public font-normal">
        Sin coincidencias...
      </p>
    );
  }

  function filterByValueAndCheck() {
    const value = getValue.trim().toLowerCase();
    const booksFiltered = myBooks
      .filter(
        (book: any) =>
          book.state.toLowerCase() == getSelectStateValue.toLowerCase()
      )
      .filter(
        (book: any) =>
          book.title.toLowerCase().includes(value) ||
          book.author.toLowerCase().includes(value)
      )
      .map((book: any) => (
        <BookCard
          showDetails={showDetails}
          key={book.title}
          id={book.id}
          title={book.title}
          author={book.author}
          state={book.state}
          image={book.image}
          gender={book.gender}
        />
      ));

    return booksFiltered.length > 0 ? (
      booksFiltered
    ) : (
      <p className="text-gray-200/70 text-2xl font-public font-normal">
        Sin coincidencias...
      </p>
    );
  }

  return (
    <div className="w-[600px] grid place-items-center gap-y-4">
      <div className="w-full flex ">
        <svg
          onClick={() => setShowDetails(!showDetails)}
          className="w-6 duration-300 cursor-pointer hover:scale-125"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 12H21M12 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
            stroke="#bcbcbcbb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul className="flex flex-col justify-center items-start gap-y-6 w-full pb-20">
        {!getValue && !getSelectStateValue && allBooks()}
        {getValue && !getSelectStateValue && filterByValue()}
        {!getValue && getSelectStateValue && filterByCheck()}
        {getValue && getSelectStateValue && filterByValueAndCheck()}
      </ul>
    </div>
  );
}

export default ListBooks;
