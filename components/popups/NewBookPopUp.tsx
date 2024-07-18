import useLoadContent from "@/hooks/useLoadContent";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePopUp from "@/hooks/usePopUp";
import { COLLECTION, EMPTY_BOOK, PRODUCTION } from "@/utils/consts";
import {
  dismissNoti,
  isLoaned,
  normalizeText,
  notification,
  tLC,
} from "@/utils/helpers";
import type {
  Book,
  BookData,
  Component,
  FormRef,
  InputEvent,
  SelectEvent,
} from "@/utils/types";
import { delay, isEqual, union } from "es-toolkit";
import { doc, setDoc } from "firebase/firestore/lite";
import { CircleFadingPlus as Icon } from "lucide-react";
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

function NewBookPopUp({ UID }: { UID: string }): Component {
  const [t] = useTranslation("global"),
    { closePopUp } = usePopUp(),
    router: NextRouter = useRouter(),
    formRef: FormRef = useRef<Reference>(null),
    [book, setBook] = useState<Book>(EMPTY_BOOK),
    { isLoading, startLoading } = useLoadContent(),
    [cacheBooks, setCacheBooks] = useLocalStorage("cacheBooks", null),
    [allTitles] = useLocalStorage("allTitles", []),
    [, setShowNoti] = useLocalStorage("added", false),
    [errorKey, setErrorKey] = useState<string>(""),
    [addClicked, setAddClicked] = useState<boolean>(false),
    [isCustomGender, setIsCustomGender] = useState<boolean>(false),
    [cusGenderVal, setCusGenderVal] = useState<string>("");

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
    notification("loading", t("adding"));

    try {
      const newID: string = crypto.randomUUID();
      const data: BookData = { ...book.data, owner: UID };
      await setDoc(doc(COLLECTION, newID), data);
      const newVersion: Book[] = union(cacheBooks ?? [], [{ id: newID, data }]);
      setCacheBooks(newVersion);
      setShowNoti(true);
      router.reload();
    } catch (err: any) {
      if (PRODUCTION) router.push("/error");
      else console.error(`error en newBook: ${err.message}`);
    } finally {
      dismissNoti();
    }
  }

  function validateFields(): boolean {
    const title: string = tLC(book?.data?.title ?? ""),
      repeteadTitle: boolean = allTitles.some((t: string) =>
        isEqual(normalizeText(tLC(t)), normalizeText(tLC(title)))
      ),
      maxTitleLength: boolean = title.length > 71,
      maxAuthorLength: boolean = (book?.data?.author?.length ?? 0) > 34,
      emptyCustomGender: boolean =
        isCustomGender && isEqual(cusGenderVal.length, 0),
      maxLengthGender: boolean = isCustomGender && cusGenderVal.length > 24,
      emptyLoaned: boolean =
        isLoaned(book?.data?.state ?? "") &&
        isEqual(book?.data?.loaned?.trim(), ""),
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
    <DialogContainer divClass="!w-full justify-start items-end">
      <HeaderPopUp icon={<Icon size={25} />} title={t("new-book")} />

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
            <div className="flex gap-x-2">
              <button
                disabled={isLoading}
                type="button"
                onClick={() => closePopUp("add_book")}
                className="btn text-lg sm:text-xl w-32 font-normal bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {t("cancel")}
              </button>

              {isLoading ? (
                <button
                  disabled
                  type="button"
                  className="btn bg-red-500 text-black text-lg sm:text-xl w-32"
                >
                  {t("charging")}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn bg-blue-500 font-medium sm:font-semibold text-black hover:bg-blue-400 duration-100 text-lg sm:text-xl w-32 tracking-wide"
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
