import DialogContainer from "../DialogContainer";
import FieldsBook from "../FieldsBook";
import useLoad from "@/hooks/useLoad";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import useTitles from "@/hooks/useTitles";
import { BookAdapters } from "@/adapters/book.adapters";
import { coverAtom } from "@/utils/atoms";
import { delay, isEqual } from "es-toolkit";
import { dismissNoti, notification } from "@/utils/notifications";
import { EMPTY_BOOK, PAGES } from "@/utils/consts";
import { ERROR_DELAY_MS, validateImageUrl } from "@/utils/validation";
import { ERROR_KEYS, VALIDATION_MESSAGES } from "@/utils/messages";
import { isLent, len, tLC } from "@/utils/helpers";
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

function NewBookPopUp({ UID }: Props): Component {
  const { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    formRef = useRef<HTMLFormElement>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { isLoading, startLoading } = useLoad(),
    [cacheBooks, setCacheBooks] = useLocalStorage<Book[] | null>("cache-books", null),
    [, setShowNoti] = useLocalStorage("added", false),
    [errorKey, setErrorKey] = useState<string>(""),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [isCustomGender, setIsCustomGender] = useState<boolean>(false),
    [cusGenderVal, setCusGenderVal] = useState<string>(""),
    [coverLoading] = useRecoilState(coverAtom),
    formatTitle: string = tLC(book?.data?.title ?? ""),
    { isRepeated } = useTitles(formatTitle);

  useEffect(() => {
    (async function () {
      await delay(ERROR_DELAY_MS);
      setErrorKey("");
    })();
  }, [addClicked]);

  function handleState(state: string): void {
    setBook({
      ...book,
      data: { ...book.data, state },
    });
  }

  function handleChange(e: InputEvent): void {
    const key: string = e.target?.name;
    const value: string = e.target?.value.trim();
    setBook({
      ...book,
      data: { ...book.data, [key]: value },
    });
  }

  function handleImage(image: string): void {
    setBook({
      ...book,
      data: { ...book.data, image },
    });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value.trim();
    setIsCustomGender(isEqual(gender, "custom"));
    setBook({
      ...book,
      data: { ...book.data, gender },
    });
  }

  async function newBook(e: FormEvent): Promise<void> {
    e.preventDefault();
    setAddClicked(!addClicked);

    if (!validateFields()) return;
    startLoading();
    notification("loading", "Añadiendo...");

    try {
      const id: string = crypto.randomUUID();
      const data: BookData = { ...book.data, owner: UID };
      await BookAdapters.manageBook(id, data, UID);
      const newVersion: Book[] = [...(cacheBooks ?? []), { id, data }];
      setCacheBooks(newVersion);
      setShowNoti(true);
      router.reload();
    } catch (err: any) {
      router.push(PAGES.ERROR);
      console.error(`catch 'newBook' ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  function validateFields(): boolean {
    const
      maxTitleLength = len(formatTitle) > 80,
      maxAuthorLength = len(book?.data?.author ?? "0") > 34,
      emptyCustomGender = isCustomGender && !cusGenderVal,
      maxLengthGender = isCustomGender && len(cusGenderVal) > 24,
      emptyLoaned = isLent(book?.data?.state ?? "") && !book?.data?.loaned?.trim(),
      maxLengthLoaned = isLent(book?.data?.state ?? "") && len(book?.data?.loaned ?? "0") > 24,
      validateImg = len(book?.data?.image ?? "0") > 0 && !validateImageUrl(book?.data?.image ?? "");

    if (!formatTitle) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_EMPTY);
      return false;
    }
    if (isRepeated) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_REPEATED);
      return false;
    }
    if (maxTitleLength) {
      setErrorKey(ERROR_KEYS.TITLE);
      notification("error", VALIDATION_MESSAGES.TITLE_TOO_LONG);
      return false;
    }
    if (formatTitle.includes("/")) {
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
      id="add_book"
      divClass="!w-full items-end !justify-start lg:justify-between"
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
        isLent={isLent(book.data.state ?? "")}
        isEditing={false}
      />

      <form
        onSubmit={newBook}
        ref={formRef}
        method="dialog"
        className="w-full border-violet-500/10"
      >
        <div className="flex justify-end items-center gap-x-3 mt-3">
          <button
            disabled={isLoading || coverLoading}
            type="button"
            onClick={() => closePopUp("add_book")}
            className="px-4 py-2 rounded-xl bg-slate-900/60 
            border border-violet-500/15 
            hover:bg-slate-900/80 hover:border-violet-500/30 
            transition-colors disabled:opacity-50 
            text-slate-400 hover:text-slate-300 text-lg"
          >
            Cancelar
          </button>

          <button
            disabled={isLoading || coverLoading}
            type="submit"
            className="px-8 py-2 rounded-xl
            bg-violet-500/50 border border-violet-500/20
            hover:bg-violet-500/60 hover:border-violet-500/30
            transition-colors disabled:opacity-50
            text-violet-50 text-lg font-medium"
          >
            Añadir
          </button>
        </div>
      </form>
    </DialogContainer>
  );
}

export default NewBookPopUp;

interface Props {
  UID: string;
}
