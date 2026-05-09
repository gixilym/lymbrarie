import DialogContainer from "../DialogContainer";
import FieldsBook from "../FieldsBook";
import useLoad from "@/hooks/useLoad";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { BookAdapters } from "@/adapters/book.adapters";
import { deburr, delay, isEqual } from "es-toolkit";
import { dismissNoti, notification } from "@/utils/notifications";
import { EMPTY_BOOK, GENDERS, PAGES } from "@/utils/consts";
import { ERROR_DELAY_MS, validateImageUrl } from "@/utils/validation";
import { ERROR_KEYS, VALIDATION_MESSAGES } from "@/utils/messages";
import { isLent, len, tLC } from "@/utils/helpers";
import { scrollAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import type {
  Book,
  BookData,
  Component,
  InputEvent,
  SelectEvent,
} from "@/utils/types";
import { type NextRouter, useRouter } from "next/router";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

function EditBookPopUp(props: Props): Component {
  const { data: dataBook, documentId, UID } = props,
    data: BookData = dataBook?.data,
    { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    bookId: string = router.query.bookId as string,
    formatBookId: string = decodeURIComponent(bookId),
    form = useRef<HTMLFormElement>(null),
    { isLoading, startLoading } = useLoad(),
    [book, setBook] = useState<any>(EMPTY_BOOK),
    customVal: boolean = !GENDERS.includes(tLC(data?.gender ?? "")),
    [isCustomGender, setIsCustomGender] = useState<boolean>(customVal),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [cacheBooks, setCacheBooks] = useLocalStorage<Book[] | null>("cache-books", null),
    [allTitles, setAllTitles] = useLocalStorage<string[]>("all-titles", []),
    [, setScrollLS] = useLocalStorage("scroll-editpopup", 0),
    [scroll] = useRecoilState(scrollAtom),
    [editDisabled, setEditDisabled] = useState<boolean>(true),
    [errorKey, setErrorKey] = useState<string>(""),
    handleState = (state: string): void => setBook({ ...book, state }),
    [cusGenderVal, setCusGenderVal] = useState<string>(data?.gender ?? "");

  useEffect(() => loadBookData(), [data]);

  useEffect(() => {
    (async function () {
      await delay(ERROR_DELAY_MS);
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
      notes: data?.notes ?? "",
      isFav: data?.isFav ?? false,
    };
    setBook({ ...loadData });
  }

  function handleChange(e: InputEvent): void {
    const key: string = e.target?.name;
    const value: string = e.target?.value.trim();
    setBook({ ...book, [key]: value });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value.trim();
    setBook({ ...book, gender });
    setIsCustomGender(isEqual(gender, "custom"));
  }

  function handleImage(image: string): void {
    setBook({ ...book, image });
  }

  async function editBook(e: FormEvent): Promise<void> {
    e.preventDefault();
    setAddClicked(!addClicked);

    if (!validateFields()) return;
    startLoading();
    notification("loading", "Editando...");

    const loaned: string = isLent(book.state) ? book.loaned : "",
      updatedData: BookData = { ...book, loaned } as const,
      oldVersion: Book[] = cacheBooks?.filter((b: Book) => b.id != documentId) ?? [],
      newVersion: Book[] = [...oldVersion, { id: documentId, data }],
      titlePage: string = encodeURIComponent(book.title),
      newPath: string = `${PAGES.BOOK}/${titlePage}`,
      newTitles: string[] = [...allTitles, book.title];

    try {
      await BookAdapters.manageBook(documentId, updatedData, UID);
      setCacheBooks(newVersion);
      setAllTitles(newTitles);
      setScrollLS(scroll);
      await router.push(PAGES.HOME).then(() => router.push(newPath));
    } catch (err: any) {
      router.push(PAGES.ERROR);
      console.error(`catch 'editBook' ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  function validateFields(): boolean {
    const title: string = tLC(book.title ?? ""),
      repeteadTitle: boolean = allTitles.some(
        (t: string) =>
          deburr(tLC(t)) != deburr(tLC(formatBookId)) &&
          isEqual(deburr(tLC(t)), deburr(tLC(title)))
      ),
      maxTitleLength = len(title) > 80,
      maxAuthorLength = len(book.author ?? "0") > 34,
      emptyCustomGender = isCustomGender && !cusGenderVal,
      maxLengthGender = isCustomGender && len(cusGenderVal ?? "0") > 24,
      emptyLoaned = isLent(book.state ?? "") && !book.loaned?.trim(),
      maxLengthLoaned = isLent(book.state ?? "") && len(book.loaned ?? "0") > 24,
      validateImg = len(book?.image ?? "0") > 0 && !validateImageUrl(book.image ?? "");

    if (!title) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_EMPTY);
      return false;
    }
    if (repeteadTitle) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_REPEATED);
      return false;
    }
    if (maxTitleLength) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_TOO_LONG);
      return false;
    }
    if (title.includes("/")) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_HAS_SLASH);
      return false;
    }
    if (maxAuthorLength) {
      setErrorKey(ERROR_KEYS.AUTHOR);
      notification("error", VALIDATION_MESSAGES.AUTHOR_TOO_LONG);
      return false;
    }
    if (emptyCustomGender) {
      setErrorKey(ERROR_KEYS.GENDER);
      notification("error", VALIDATION_MESSAGES.GENDER_EMPTY);
      return false;
    }
    if (maxLengthGender) {
      setErrorKey(ERROR_KEYS.GENDER);
      notification("error", VALIDATION_MESSAGES.GENDER_TOO_LONG);
      return false;
    }
    if (emptyLoaned) {
      setErrorKey(ERROR_KEYS.LOANED);
      notification("error", VALIDATION_MESSAGES.LOANED_EMPTY);
      return false;
    }
    if (maxLengthLoaned) {
      setErrorKey(ERROR_KEYS.LOANED);
      notification("error", VALIDATION_MESSAGES.LOANED_TOO_LONG);
      return false;
    }
    if (validateImg) {
      setErrorKey(ERROR_KEYS.IMAGE);
      notification("error", VALIDATION_MESSAGES.INVALID_URL);
      return false;
    }
    return true;
  }

  return (
    <DialogContainer
      id="edit_book"
      divClass="!justify-start lg:justify-between"
    >
      <FieldsBook
        errorKey={errorKey}
        handleChange={handleChange}
        isLoading={isLoading}
        setCusGenderVal={setCusGenderVal}
        isCustomGender={isCustomGender}
        handleGender={handleGender}
        handleState={handleState}
        handleImage={handleImage}
        isLent={isLent(book?.state)}
        defaultValueTitle={data?.title}
        defaultValueAuthor={data?.author}
        defaultValueGender={data?.gender}
        defaultValueState={data?.state}
        defaultValueLoaned={data?.loaned}
        defaultValueImg={data?.image}
        isEditing
      />

      <form
        onSubmit={editBook}
        ref={form}
        method="dialog"
        className="flex justify-end items-center font-public max-w-full gap-x-2"
      >
        <button
          disabled={isLoading}
          type="button"
          onClick={() => closePopUp("edit_book")}
          className="px-4 py-2 rounded-xl bg-slate-900/60 
            border border-violet-500/15 
            hover:bg-slate-900/80 hover:border-violet-500/30 
            transition-colors disabled:opacity-50 
            text-slate-400 text-lg"
        >
          Cancelar
        </button>
        <button
          disabled={editDisabled || isLoading}
          type="submit"
          className="px-8 py-2 rounded-xl
            bg-violet-500/20 border border-violet-500/20
            hover:bg-violet-500/30 hover:border-violet-500/30
            transition-colors disabled:opacity-50 disabled:hover:bg-violet-500/20
            text-violet-50 text-lg font-medium"
        >
          Editar
        </button>
      </form>
    </DialogContainer>
  );
}

export default EditBookPopUp;

interface Props {
  data: Book;
  documentId: string;
  UID: string;
}
