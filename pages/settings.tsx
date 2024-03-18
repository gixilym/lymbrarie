"use client";
import { FormEvent, useState } from "react";
import { BackSVG } from "@/utils/svgs";
import Link from "next/link";
import axios from "axios";
import { twMerge } from "tailwind-merge";

function Settings() {
  const [face, setFace] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!message) return;
    setMessage("");
    setFace(null);
    await axios.post("/api/email", { message, face });
  }

  return (
    <div className="w-[350px] flex flex-col items-start justify-center gap-y-12 pt-10">
      <BackSVG route="/" />

      <form
        onSubmit={handleSubmit}
        className="mt-20 w-full bg-slate-700 border border-slate-500 flex flex-col justify-between items-center rounded-xl p-2 gap-y-3"
      >
        <p className="text-center text-gray-100 text-xl font-bold">
          Envíame Feedback
        </p>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Añade un email al mensaje si deseas una respuesta"
          className="bg-slate-200 text-gray-700 w-full h-28 placeholder:text-gray-500 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300"
        ></textarea>

        <div className="flex flex-row justify-end items-center w-full gap-x-2">
          <svg
            onClick={() => setFace(false)}
            className={twMerge(
              !face && face != null ? "bg-blue-300" : "bg-slate-300",
              "fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 hover:border-slate-600 border border-slate-200"
            )}
            height="40px"
            viewBox="0 0 512 512"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>

          <svg
            onClick={() => setFace(true)}
            className={twMerge(
              face ? "bg-yellow-300" : "bg-slate-300",
              "fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 hover:border-slate-600 border border-slate-200"
            )}
            height="40px"
            viewBox="0 0 512 512"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>

          <button type="submit">
            <svg
              className="bg-slate-200 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:bg-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              height="40px"
              width="60px"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M10.11 13.6501L13.69 10.0601"
              />
            </svg>
          </button>
        </div>
      </form>
      <Link
        href="/api/auth/signout"
        className="cursor-pointer transition-all text-white w-full py-2 rounded-lg
        border-red-400 border-[2px] hover:brightness-75 text-xl font-semibold text-center"
      >
        Cerrar Sesión
      </Link>

      <Link
        rel="noreferrer"
        href="https://gixi.me"
        target="_blank"
        className="text-gray-200 text-md sm:text-lg hover:text-gray-500 cursor-pointer w-full text-center pt-6"
        title="gixi contact"
      >
        Creado con ❤️ por <u>gixi</u>
      </Link>
    </div>
  );
}

export default Settings;
