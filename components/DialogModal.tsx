"use client";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams, useRouter } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { twMerge } from "tailwind-merge";
import {
  useEffect,
  useState,
  Reference,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";

function DialogModal() {
  const [mySession, setMySession] = useState<any>(null),
    form: any = useRef<Reference>(null),
    router: AppRouterInstance = useRouter(),
    [book, setBook] = useState<BookType>(initialBook),
    email: string = mySession?.email,
    params: Params = useSearchParams(),
    theme: string = params.get("theme");

  useEffect(() => {
    (async function () {
      const session: SessionType = await getSession();
      setMySession(session?.user);
    })();
  }, []);

  function handleChange(event: ChangeEvent<any>) {
    const key: string = event.target?.name;
    const value: string = event.target?.value;
    setBook({ ...book, [key]: value });
  }

  function handleStateChange(selectedState: string) {
    setBook({ ...book, state: selectedState });
  }

  async function newBook(event: FormEvent) {
    event.preventDefault();
    await axios.post("/api/books", { ...book, owner: email });
    router.refresh();
    closeModal();
  }

  function closeModal() {
    const modal: any = document.getElementById("add_book");
    modal?.close();
  }

  return (
    <dialog data-theme={theme} id="add_book" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/6 max-w-5xl flex flex-col gap-y-3 border-2 border-rose-300/10">
        <h3
          className={twMerge(
            theme == "sunset" ? "text-white" : "text-black",
            "text-lg font-medium pb-1"
          )}
        >
          Nuevo libro
        </h3>
        <label className="input input-bordered flex items-center text-lg">
          <input
            onChange={handleChange}
            required
            name="title"
            type="text"
            className="grow px-1 placeholder:text-slate-500"
            placeholder="Título: Don Quijote de la Mancha"
          />
        </label>

        <label className="input input-bordered flex items-center text-lg">
          <input
            onChange={handleChange}
            name="author"
            type="text"
            className="grow px-1 placeholder:text-slate-500"
            placeholder="Autor: Miguel Cervantes"
          />
        </label>

        <label className="input input-bordered flex items-center text-lg">
          <input
            onChange={handleChange}
            name="gender"
            type="text"
            className="grow px-1 placeholder:text-slate-500"
            placeholder="Género: Sátira"
          />
        </label>
        <select
          onChange={e => handleStateChange(e.target.value)}
          className="select input-bordered text-lg w-full text-slate-500"
          defaultValue="Estado"
        >
          <option value="Estado" disabled>
            Estado
          </option>
          <option value="Read">Leyendo</option>
          <option value="Reading">Leído</option>
          <option value="Pending">Pendiente</option>
        </select>

        <div>
          <label className="input input-bordered flex items-center text-lg">
            <input
              onChange={handleChange}
              name="image"
              type="text"
              className="grow px-1 placeholder:text-slate-500 text-md"
              placeholder="Link de imagen: https://res.cloudinary.com/dgs55s8qh/image/upload/v1711510484/dvjjtuqhfjqtwh3vcf3p.webp"
            />
          </label>
          <Link
            href="https://image-to-link.netlify.app"
            target="_blank"
            className="link text-slate-500 hover:text-slate-400 duration-75"
          >
            genera el link de tu imagen aquí
          </Link>
        </div>

        <div className="modal-action pt-1">
          <form
            onSubmit={newBook}
            ref={form}
            method="dialog"
            className="space-x-2 font-public"
          >
            <button
              type="button"
              onClick={closeModal}
              className="btn text-lg w-24 px-2 bg-slate-800 hover:bg-slate-700 text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn bg-green-500 text-black hover:bg-green-400 duration-100 text-lg w-24 px-2"
            >
              Añadir
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default DialogModal;

type SessionType = Session | null;

interface BookType {
  title: string;
  author: string;
  state: string;
  image: string;
  pages: number;
  gender: string;
}

const initialBook = {
  title: "",
  author: "",
  state: "Pending",
  image: "",
  pages: 0,
  gender: "",
};
