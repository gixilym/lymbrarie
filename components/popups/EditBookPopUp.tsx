import { GENDERS } from "@/utils/consts";
import { isLoaned, notification, tLC } from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import usePopUp from "@/utils/hooks/usePopUp";
import { BOOK_HANDLER_URL, EMPTY_BOOK } from "@/utils/store";
import type {
  Book,
  BookData,
  Component,
  FormRef,
  InputEvent,
  SelectEvent,
  Timer,
} from "@/utils/types";
import axios from "axios";
import {
  type FormEvent,
  type Reference,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import DialogContainer from "../DialogContainer";
import FieldsBook from "../FieldsBook";
import PopUpTitle from "./TitlePopUp";
import { useRouter } from "next/router";

function EditBookPopUp({ data: dataBook, documentId }: Props): Component {
  const data = dataBook.data,
    [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    router = useRouter(),
    bookId = router.query.bookId as string,
    formatBookId: string = bookId.replaceAll("_", " ").replaceAll("@", "?"),
    form: FormRef = useRef<Reference>(null),
    { isLoading, startLoading } = useLoadContent(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    customVal: boolean = !GENDERS.includes(tLC(data?.gender)),
    [isCustomGender, setIsCustomGender] = useState<boolean>(customVal),
    [customGenderVal, setCustomGenderVal] = useState<string>(data?.gender),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [allTitles] = useLocalStorage("allTitles", []),
    [editDisabled, setEditDisabled] = useState<boolean>(true),
    [errorKey, setErrorKey] = useState<string>(""),
    handleState = (state: string): void => setBook({ ...book, state });

  useEffect(() => loadBookData(), [data]);

  useEffect(() => {
    const timer: Timer = setTimeout(() => setErrorKey(""), 2300);
    return () => clearTimeout(timer);
  }, [addClicked]);

  useEffect(() => {
    const noChanges: boolean =
      book.title == data?.title &&
      book.gender == data?.gender &&
      book.state == data?.state &&
      book.image == data?.image &&
      book.author == data?.author &&
      book.loaned == data?.loaned;

    if (noChanges) return setEditDisabled(true);
    else setEditDisabled(false);
  }, [book, data]);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editDisabled]);

  function handleBeforeUnload(e: BeforeUnloadEvent): string | void {
    if (!editDisabled) {
      const msg: string = t("unsaved-changes");
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  }

  function handleRouteChange(): void {
    if (!editDisabled) {
      const msg: boolean = confirm(t("unsaved-changes"));
      if (!msg) {
        router.events.emit("routeChangeError");
        throw "Route change aborted";
      }
    }
  }

  function loadBookData(): void {
    const loadData: BookData = {
      title: data?.title,
      author: data?.author,
      state: data?.state,
      image: data?.image,
      gender: data?.gender,
      owner: data?.owner,
      loaned: data?.loaned,
      notes: data?.notes,
    };
    setBook({ ...loadData });
  }

  function handleChange(e: InputEvent): void {
    const key: string = e.target?.name;
    const value: string = e.target?.value;
    setBook({ ...book, [key]: value });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value;
    setBook({ ...book, gender });
    setIsCustomGender(gender == "custom");
  }

  async function editBook(e: FormEvent): Promise<void> {
    e.preventDefault();
    setAddClicked(!addClicked);

    const title: string = tLC(book.title ?? ""),
      repeteadTitle: boolean = allTitles.some(
        (t: string) => tLC(t) != tLC(formatBookId) && tLC(t) == title
      ),
      maxTitleLength: boolean = title.length > 71,
      maxAuthorLength: boolean = (book.author?.length ?? 0) > 34,
      emptyCustomGender: boolean =
        isCustomGender && customGenderVal.length == 0,
      maxLengthGender: boolean = isCustomGender && customGenderVal.length > 24,
      emptyLoaned: boolean =
        isLoaned(book.state ?? "") && book.loaned?.trim() == "",
      maxLengthLoaned: boolean =
        isLoaned(book.state ?? "") && (book.loaned?.length ?? 0) > 24,
      validateURL: RegExp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      validateImg: boolean =
        (book.image?.length ?? 0) > 1 && !validateURL.test(book.image ?? "");

    if (!title) {
      setErrorKey("title-input");
      return notification("error", t("empty-title"));
    }
    if (repeteadTitle) {
      console.log(repeteadTitle);
      setErrorKey("title-input");
      return notification("error", t("repeated-title"));
    }

    if (maxTitleLength) {
      setErrorKey("title-input");
      return notification("error", t("title-too-long"));
    }

    if (title.includes("@")) {
      setErrorKey("title-input");
      return notification("error", t("@"));
    }

    if (maxAuthorLength) {
      setErrorKey("author-input");
      return notification("error", t("author-too-long"));
    }

    if (emptyCustomGender) {
      setErrorKey("gender-input");
      return notification("error", t("empty-custom-gender"));
    }

    if (maxLengthGender) {
      setErrorKey("gender-input");
      return notification("error", t("custom-gender-too-long"));
    }

    if (emptyLoaned) {
      setErrorKey("loaned-input");
      return notification("error", t("empty-loaned"));
    }

    if (maxLengthLoaned) {
      setErrorKey("loaned-input");
      return notification("error", t("loaned-too-long"));
    }

    if (validateImg) {
      setErrorKey("image-input");
      return notification("error", t("invalid-url-image"));
    }

    const loaned: string = !isLoaned(book.state ?? "") ? "" : book.loaned ?? "";
    const updatedBook: Book = { ...book, loaned };
    const bookData: object = { documentId, updatedBook };
    // const title: string = book.title?.replaceAll(" ", "_").replaceAll(/\?/g, "@") ?? "";
    // location.href = "/" + title;
    startLoading();
    axios.patch(BOOK_HANDLER_URL, bookData);
    setCacheBooks(null);
    location.href = "/";
  }

  return (
    <DialogContainer divClass="justify-between">
      <PopUpTitle title={t("edit-book")} />

      <FieldsBook
        errorKey={errorKey}
        handleChange={handleChange}
        isLoading={isLoading}
        setCustomGenderVal={setCustomGenderVal}
        isCustomGender={isCustomGender}
        handleGender={handleGender}
        handleState={handleState}
        isLoaned={isLoaned(book.data?.state ?? "")}
        defaultValueTitle={data?.title}
        defaultValueAuthor={data?.author}
        defaultValueGender={data?.gender}
        defaultValueState={data?.state}
        defaultValueLoaned={data?.loaned}
        defaultValueImg={data?.image}
      />

      <div className="modal-action pt-1">
        <form
          onSubmit={editBook}
          ref={form}
          method="dialog"
          className="space-x-2 font-public"
        >
          <button
            type="button"
            onClick={() => closePopUp("edit_book")}
            className="btn text-lg w-24 px-2 bg-slate-800 hover:bg-slate-700 text-white"
          >
            {t("cancel")}
          </button>

          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-red-500 text-black hover:bg-red-400 duration-100 text-lg w-24 px-2"
            >
              {t("charging")}
            </button>
          ) : (
            <button
              disabled={editDisabled}
              type="submit"
              className="btn bg-blue-500 text-black hover:bg-blue-400 duration-100 text-lg w-24 px-2"
            >
              {t("edit-confirm")}
            </button>
          )}
        </form>
      </div>
    </DialogContainer>
  );
}

export default EditBookPopUp;

interface Props {
  data: any;
  documentId: string;
}
