import type { Component } from "@/utils/types";
import Link from "next/link";

function CreditsPage(): Component {
  return (
    <section
      //   style={styles}
      className="relative max-w-2xl w-full px-6 sm:px-0 mb-16 lg:mb-36 text-slate-200/90 text-sm sm:text-xl flex flex-col justify-start items-center gap-y-8 [&>p]:w-full [&>p]:text-pretty"
    >
      <Link
        href="/"
        className="w-full text-xl underline text-center sm:text-start absolute"
      >
        {/* {t("back")} */}Volver
      </Link>
      <p className="mt-20 xl:mt-14">
        Quiero agradecer a Briseed que colaboró para que Lymbrarie pueda ser tan
        bello estéticamente.
      </p>
      <p>
        A mi profesora particular de inglés Verónica que aparte de enseñarme el
        idioma, me guió para traducir correctamente el sitio permitiendo que sea
        accesible para más usuarios.
      </p>

      <p>
        Y una mención especial para todos los usuarios que se han contactado
        conmigo para sugerirme mejoras y reportar errores. Gracias a ustedes
        Lymbrarie sigue creciendo.
      </p>
    </section>
  );
}

export default CreditsPage;
