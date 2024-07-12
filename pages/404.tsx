import type { Component } from "@/utils/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function NotFound(): Component {
  const [t] = useTranslation("global");

  return (
    <section className="grid place-items-center text-slate-100">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 mt-20">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
            404
          </p>
          <p className="mb-4 text-3xl tracking-tight font-semibold ">
            {t("page-not-found")}
          </p>

          <Link
            href="/"
            className="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            <u className="text-xl">{t("home")}</u>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
