"use client";
import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackSVG, ReadSVG, ReadingSVG, PendingSVG } from "@/utils/svgs";
import LoadComponent from "@/components/LoadComponent";
import ButtonsBook from "@/components/ButtonsBook";
import { db } from "@/database/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  Query,
  doc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";

function BookId() {
  const router: NextRouter = useRouter(),
    bookTitle: string = router.query.bookId?.toString() ?? "",
    [load, setLoad] = useState<boolean>(true),
    [data, setData] = useState<DocumentData | void>({}),
    [showNotes, setShowNotes] = useState<boolean>(false),
    [notes, setNotes] = useState<string>("");

  useEffect(() => {
    (async function () {
      const book: DocumentData | void = await getBookData(bookTitle);
      setData(book?.data);
      setLoad(false);
    })();
  }, [bookTitle]);

  useEffect(() => setNotes(data?.notes), [data]);

  async function saveNotesInFb() {
    if (!notes) return;

    try {
      const book: DocumentData | void = await getBookData(bookTitle);
      const bookRef: DocumentReference = doc(db, "books", book?.id);
      await updateDoc(bookRef, { notes });
    } catch (err: any) {
      console.error(`Error al guardar las notas en Firebase: ${err.messagee}`);
    }
  }

  return load ? (
    <LoadComponent />
  ) : (
    <section className="flex flex-col justify-center items-center w-full gap-y-6 ">
      <BackSVG route="/" />
      <article className="w-[700px] h-[315px] flex flex-row justify-start items-start bg-slate-800 border-4 border-gray-700 rounded-md p-1">
        <Image
          className="aspect-[200/300] w-[200px] h-[300px] object-center object-fill rounded-sm"
          src={data?.image}
          width={100}
          height={100}
          alt="cover image"
        />

        <div className="flex flex-col justify-end items-start w-full h-full ">
          <div className="flex h-full flex-col px-4 pt-2 gap-y-2">
            <h4 className="text-3xl font-bold tracking-tight text-balance text-white">
              {data?.title}
            </h4>
            <p className="text-md text-gray-200 mb-2">{data?.author}</p>
            <span className="text-sm text-gray-200 ">
              Género: {data?.gender}
            </span>

            <div className="flex items-center gap-x-2 text-gray-900">
              {getStateSVG(data?.state)}
              <span className="text-sm text-gray-200 "> {data?.state} </span>
            </div>
            <div className="flex items-center gap-2 pl-[1.8px]">
              <svg
                className="h-5 w-5 text-gray-800"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="text-sm text-gray-200 ">
                {data?.pages} pages
              </span>
            </div>
          </div>
          <ButtonsBook
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            titleBook={data?.title}
            saveNotesInFb={saveNotesInFb}
          />
        </div>
      </article>

      {showNotes ? (
        <div className="w-[700px] flex flex-col justify-start items-start bg-slate-9800 border-gray-700 rounded-md p-1 gap-y-10">
          <ReactQuill
            className="w-full bg-slate-100"
            theme="snow"
            value={notes}
            onChange={setNotes}
          />
          <div
            className="text-white w-full"
            dangerouslySetInnerHTML={{ __html: notes }}
          />
        </div>
      ) : (
        <div
          className="text-white w-[700px] mt-14"
          dangerouslySetInnerHTML={{ __html: notes }}
        />
      )}
    </section>
  );
}

export default BookId;

async function getBookData(bookTitle: string) {
  if (!bookTitle) {
    throw new Error("bookTitle is empty");
  } else {
    const q: Query<DocumentData> = query(
        collection(db, "books"),
        where("title", "==", bookTitle)
      ),
      querySnapshot: DocumentData = await getDocs(q),
      docData: DocumentData = querySnapshot.docs[0].data(),
      docId: DocumentData = querySnapshot.docs[0].id;

    return !querySnapshot.empty
      ? { data: docData, id: docId }
      : console.error("No hay libro con el título: " + bookTitle);
  }
}

function getStateSVG(state: string) {
  switch (state) {
    case "Read":
      return <ReadSVG />;

    case "Reading":
      return <ReadingSVG />;

    default:
      return <PendingSVG />;
  }
}
