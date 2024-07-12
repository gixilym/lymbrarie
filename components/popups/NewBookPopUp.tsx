import { BOOK_HANDLER_URL, EMPTY_BOOK } from "@/utils/consts";
import { isLoaned, notification, tLC } from "@/utils/helpers";
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
  Timer,
} from "@/utils/types";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
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
import ReCaptcha from "../ReCaptcha";

function NewBookPopUp({ userID }: { userID: string }): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    formRef: FormRef = useRef<Reference>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { isLoading, startLoading } = useLoadContent(),
    [, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [allTitles] = useLocalStorage("allTitles", []),
    [errorKey, setErrorKey] = useState<string>(""),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [isCustomGender, setIsCustomGender] = useState<boolean>(false),
    [cusGenderVal, setCusGenderVal] = useState<string>("");

  useEffect(() => {
    const timer: Timer = setTimeout(() => setErrorKey(""), 2300);
    return () => clearTimeout(timer);
  }, [addClicked]);

  function handleState(state: string): void {
    setBook({
      ...book,
      data: { ...book.data, state },
    });
  }

  function handleChange(e: InputEvent): void {
    const key: string = e.target?.name;
    const value: string = e.target?.value;
    setBook({
      ...book,
      data: { ...book.data, [key]: value },
    });
  }

  function handleGender(e: SelectEvent): void {
    const gender: string = e.target?.value;
    setIsCustomGender(gender == "custom");
    setBook({
      ...book,
      data: { ...book.data, gender },
    });
  }

  async function newBook(e: FormEvent): Promise<void> {
    e.preventDefault();
    setAddClicked(!addClicked);

    if (!validateFields()) return;

    const bookData: BookData = { ...book.data, owner: userID as string };
    startLoading();
    await axios.post(BOOK_HANDLER_URL, bookData);
    // setCacheBooks(null);
    router.reload();
  }

  function validateFields(): boolean {
    const title: string = tLC(book?.data?.title ?? ""),
      repeteadTitle: boolean = allTitles.includes(title),
      maxTitleLength: boolean = title.length > 71,
      maxAuthorLength: boolean = (book?.data?.author?.length ?? 0) > 34,
      emptyCustomGender: boolean = isCustomGender && cusGenderVal.length == 0,
      maxLengthGender: boolean = isCustomGender && cusGenderVal.length > 24,
      emptyLoaned: boolean =
        isLoaned(book?.data?.state ?? "") && book?.data?.loaned?.trim() == "",
      maxLengthLoaned: boolean =
        isLoaned(book?.data?.state ?? "") &&
        (book?.data?.loaned?.length ?? 0) > 24,
      validateURL: RegExp =
        /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
      validateImg: boolean =
        (book?.data?.image?.length ?? 0) > 0 &&
        !validateURL.test(book?.data?.image ?? "");

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
    <DialogContainer>
      <PopUpTitle title={t("new-book")} />

      <FieldsBook
        errorKey={errorKey}
        handleChange={handleChange}
        isLoading={isLoading}
        setCusGenderVal={setCusGenderVal}
        isCustomGender={isCustomGender}
        handleGender={handleGender}
        handleState={handleState}
        isLoaned={isLoaned(book.data.state ?? "")}
      />

      <div className="modal-action pt-1">
        <form
          onSubmit={newBook}
          ref={formRef}
          method="dialog"
          className="flex justify-center items-center font-public w-full"
        >
          <div className="w-full justify-end gap-x-4 items-center flex flex-col md:flex-row h-10">
            <ReCaptcha />
            <div className="flex gap-x-2">
              <button
                type="button"
                onClick={() => closePopUp("add_book")}
                className="btn text-lg w-24 px-2 bg-slate-800 hover:bg-slate-700 text-white"
              >
                {t("close")}
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
                  type="submit"
                  className="btn bg-blue-500 text-black hover:bg-blue-400 duration-100 text-lg w-24 px-2"
                >
                  {t("add")}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DialogContainer>
  );
}

export default NewBookPopUp;
