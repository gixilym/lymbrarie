import { COLLECTION, EMPTY_BOOK, GENDERS, PRODUCTION } from "@/utils/consts";
import {
  deformatTitle,
  dismissNoti,
  formatTitle,
  isLoaned,
  normalizeText,
  notification,
  tLC,
} from "@/utils/helpers";
import useLoadContent from "@/utils/hooks/useLoadContent";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import usePopUp from "@/utils/hooks/usePopUp";
import type {
  Book,
  BookData,
  Component,
  FormRef,
  InputEvent,
  SelectEvent,
} from "@/utils/types";
import { doc, setDoc } from "firebase/firestore/lite";
import { type NextRouter, useRouter } from "next/router";
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
import HeaderPopUp from "../HeaderPopUp";
import { PencilIcon as Icon } from "lucide-react";
import { delay, isEqual } from "es-toolkit";

function EditBookPopUp(props: Props): Component {
  const { data: dataBook, documentId } = props,
    data: BookData = dataBook.data,
    [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    bookId: string = router.query.bookId as string,
    formatBookId: string = deformatTitle(bookId),
    form: FormRef = useRef<Reference>(null),
    { isLoading, startLoading } = useLoadContent(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    customVal: boolean = !GENDERS.includes(tLC(data?.gender ?? "")),
    [isCustomGender, setIsCustomGender] = useState<boolean>(customVal),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [allTitles, setAllTitles] = useLocalStorage("allTitles", []),
    [editDisabled, setEditDisabled] = useState<boolean>(true),
    [errorKey, setErrorKey] = useState<string>(""),
    handleState = (state: string): void => setBook({ ...book, state }),
    [cusGenderVal, setCusGenderVal] = useState<string>(data?.gender ?? "");

  useEffect(() => loadBookData(), [data]);

  useEffect(() => {
    (async function () {
      await delay(2300);
      setErrorKey("");
    })();
  }, [addClicked]);

  useEffect(() => {
    const noChanges: boolean =
      isEqual(book.title, data?.title) &&
      isEqual(book.gender, data?.gender) &&
      isEqual(book.state, data?.state) &&
      isEqual(book.image, data?.image) &&
      isEqual(book.author, data?.author) &&
      isEqual(book.loaned, data?.loaned);

    if (noChanges) setEditDisabled(true);
    else setEditDisabled(false);
  }, [book, data]);

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
    setIsCustomGender(isEqual(gender, "custom"));
  }

  async function editBook(e: FormEvent): Promise<void> {
    e.preventDefault();
    setAddClicked(!addClicked);

    if (!validateFields()) return;

    startLoading();
    notification("loading", t("editing"));

    const loaned: string = isLoaned(book.state) ? book.loaned : "",
      updatedBook: Book = { ...book, loaned } as const,
      oldVersion: any[] = cacheBooks.filter((b: Book) => b.id != documentId),
      newVersion: Book[] = [
        ...oldVersion,
        { id: documentId, data: updatedBook },
      ],
      titlePage: string = formatTitle(book.title),
      newPath: string = `/book/${titlePage}`,
      newTitles: string[] = [...allTitles, book.title ?? ""];

    try {
      await setDoc(doc(COLLECTION, documentId), updatedBook);
      setCacheBooks(newVersion);
      setAllTitles(newTitles);
      router.replace(newPath).then(() => router.reload());
    } catch (err: any) {
      if (PRODUCTION) router.push("/error?err=unknown");
      else console.error(`error en editBook: ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  function validateFields(): boolean {
    const title: string = tLC(book.title ?? ""),
      repeteadTitle: boolean = allTitles.some(
        (t: string) =>
          normalizeText(tLC(t)) != normalizeText(tLC(formatBookId)) &&
          isEqual(normalizeText(tLC(t)), normalizeText(tLC(title)))
      ),
      maxTitleLength: boolean = title.length > 71,
      maxAuthorLength: boolean = (book.author?.length ?? 0) > 34,
      emptyCustomGender: boolean =
        isCustomGender && isEqual(cusGenderVal.length ?? 0, 0),
      maxLengthGender: boolean =
        isCustomGender && (cusGenderVal.length ?? 0) > 24,
      emptyLoaned: boolean =
        isLoaned(book.state ?? "") && isEqual(book.loaned?.trim(), ""),
      maxLengthLoaned: boolean =
        isLoaned(book.state ?? "") && (book.loaned?.length ?? 0) > 24,
      validateURL: RegExp =
        /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
      validateImg: boolean =
        (book?.image?.length ?? 0) > 0 && !validateURL.test(book.image ?? "");

    if (!title) {
      setErrorKey("title-input");
      notification("error", t("empty-title"));
      return false;
    }
    if (repeteadTitle) {
      setErrorKey("title-input");
      notification("error", t("repeated-title"));
      return false;
    }

    if (maxTitleLength) {
      setErrorKey("title-input");
      notification("error", t("title-too-long"));
      return false;
    }

    if (title.includes("@")) {
      setErrorKey("title-input");
      notification("error", t("@"));
      return false;
    }

    if (title.includes("_")) {
      setErrorKey("title-input");
      notification("error", t("_"));
      return false;
    }

    if (maxAuthorLength) {
      setErrorKey("author-input");
      notification("error", t("author-too-long"));
      return false;
    }

    if (emptyCustomGender) {
      setErrorKey("gender-input");
      notification("error", t("empty-custom-gender"));
      return false;
    }

    if (maxLengthGender) {
      setErrorKey("gender-input");
      notification("error", t("custom-gender-too-long"));
      return false;
    }

    if (emptyLoaned) {
      setErrorKey("loaned-input");
      notification("error", t("empty-loaned"));
      return false;
    }

    if (maxLengthLoaned) {
      setErrorKey("loaned-input");
      notification("error", t("loaned-too-long"));
      return false;
    }

    if (validateImg) {
      setErrorKey("image-input");
      notification("error", t("invalid-url-image"));
      return false;
    }

    return true;
  }

  return (
    <DialogContainer divClass="justify-between">
      <HeaderPopUp icon={<Icon size={25} />} title={t("edit-book")} />

      <FieldsBook
        errorKey={errorKey}
        handleChange={handleChange}
        isLoading={isLoading}
        setCusGenderVal={setCusGenderVal}
        isCustomGender={isCustomGender}
        handleGender={handleGender}
        handleState={handleState}
        isLoaned={isLoaned(book?.state)}
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
          className="space-x-2 "
        >
          <button
            disabled={isLoading}
            type="button"
            onClick={() => closePopUp("edit_book")}
            className="btn text-lg w-auto font-thin bg-slate-800 hover:bg-slate-700 text-white"
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
  data: Book;
  documentId: string;
}
