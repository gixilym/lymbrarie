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
import { isLent, len, tLC } from "@/utils/helpers";
import { useRecoilState } from "recoil";
import type {
  Book,
  BookData,
  Component,
  FormRef,
  InputEvent,
  SelectEvent,
} from "@/utils/types";
import { type NextRouter, useRouter } from "next/router";
import {
  type FormEvent,
  type Reference,
  useEffect,
  useRef,
  useState,
} from "react";

function NewBookPopUp({ UID }: Props): Component {
  const { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    formRef: FormRef = useRef<Reference>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { isLoading, startLoading } = useLoad(),
    [cacheBooks, setCacheBooks] = useLocalStorage("cache-books", null),
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
      await delay(2300);
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
    const maxTitleLength: boolean = len(formatTitle) > 80,
      maxAuthorLength: boolean = len(book?.data?.author ?? "0") > 34,
      emptyCustomGender: boolean =
        isCustomGender && isEqual(len(cusGenderVal), 0),
      maxLengthGender: boolean = isCustomGender && len(cusGenderVal) > 24,
      emptyLoaned: boolean =
        isLent(book?.data?.state ?? "") &&
        isEqual(book?.data?.loaned?.trim(), ""),
      maxLengthLoaned: boolean =
        isLent(book?.data?.state ?? "") && len(book?.data?.loaned ?? "0") > 24,
      validateURL: RegExp =
        /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
      validateImg: boolean =
        len(book?.data?.image ?? "0") > 0 &&
        !validateURL.test(book?.data?.image ?? "");

    if (!formatTitle) {
      setErrorKey("title-input");
      notification("error", "El título no puede estar vacío");
      return false;
    }
    if (isRepeated) {
      setErrorKey("title-input");
      notification("error", "Ya tienes un libro con ese título");
      return false;
    }

    if (maxTitleLength) {
      setErrorKey("title-input");
      notification(
        "error",
        "El título es demasiado largo (máx. 80 caracteres)"
      );
      return false;
    }

    if (formatTitle.includes("/")) {
      setErrorKey("title-input");
      notification("error", "El título no puede contener el símbolo /");
      return false;
    }

    if (maxAuthorLength) {
      setErrorKey("author-input");
      notification("error", "El autor es demasiado largo (máx. 34 caracteres)");
      return false;
    }

    if (emptyCustomGender) {
      setErrorKey("gender-input");
      notification("error", "El género personalizado no puede estar vacío");
      return false;
    }

    if (maxLengthGender) {
      setErrorKey("gender-input");
      notification(
        "error",
        "El género es demasiado largo (máx. 24 caracteres)"
      );
      return false;
    }

    if (emptyLoaned) {
      setErrorKey("lent-input");
      notification("error", "Debes indicar a quién prestaste el libro");
      return false;
    }

    if (maxLengthLoaned) {
      setErrorKey("lent-input");
      notification(
        "error",
        "El nombre es demasiado largo (máx. 24 caracteres)"
      );
      return false;
    }

    if (validateImg) {
      setErrorKey("image-input");
      notification("error", "La URL de la imagen no es válida");
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
