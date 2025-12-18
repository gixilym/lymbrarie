import ConfigOption from "@/components/ConfigOption";
import LoaderCircle from "@/components/LoaderCircle";
import useGuest from "@/hooks/useGuest";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  animateOpacity,
  clearStorage,
  len,
} from "@/utils/helpers";
import { animated, useSpring } from "@react-spring/web";
import { AuthAction, withUser } from "next-firebase-auth";
import { PAGES } from "@/utils/consts";
import { type Auth, getAuth } from "firebase/auth";
import { type NextRouter, useRouter } from "next/router";
import type { Component, EventSelect } from "@/utils/types";
import {
  TypeIcon,
  CircleIcon,
  LibraryIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: LoaderCircle,
})(ConfigPage);

function ConfigPage(): Component {
  const auth: Auth = getAuth(),
    { push }: NextRouter = useRouter(),
    [animations, setAnimations] = useLocalStorage("animations", true),
    [state, setState] = useLocalStorage("state", true),
    [recommendations, setRecom] = useLocalStorage("recommendations", true),
    [circles, setCircles] = useLocalStorage("circles", true),
    [lang, setLang] = useLocalStorage("language", true),
    { isGuest } = useGuest(),
    [username, setUsername] = useLocalStorage("username", ""),
    [styles] = useSpring(() => animateOpacity(1, 400));

  function handleUsername(e: EventSelect): void {
    if (len(username) > 38) return;
    else setUsername(e.target.value);
  }

  function forgetSession(): void {
    clearStorage();
    setRecom(recommendations);
    setCircles(circles);
    setLang(lang);
    setAnimations(animations);
    setState(state);
    auth.signOut();
    push(PAGES.LOGIN);
  }
  return (
    <animated.section
      style={styles}
      className="relative max-w-4xl w-full mb-16 lg:mb-36 text-slate-200/90 flex flex-col justify-start items-center gap-y-12"
    >
      <div className="w-full space-y-4 bg-slate-900/40 backdrop-blur-sm p-8 md:rounded-2xl md:border border-violet-500/20">
        <ConfigOption
          isInput
          inputVal={username}
          handleChange={handleUsername}
          Icon={TypeIcon}
          label="Nombre de usuario"
        />

        {/* <ConfigOption
          label="Recomendaciones"
          textBtn={recommendations ? "Activado" : "Desactivado"}
          Icon={MegaphoneIcon}
          action={() => {
            if (
              recommendations &&
              Array.isArray(cacheBooks) &&
              len(cacheBooks) == 0
            ) {
              alert(
                "Debes añadir al menos un libro para desactivar las recomendaciones."
              );
            } else setRecom(!recommendations);
          }}
        /> */}

        <ConfigOption
          label="Mostrar estado"
          textBtn={state ? "Activado" : "Desactivado"}
          Icon={LibraryIcon}
          action={() => setState(!state)}
        />

        <ConfigOption
          label="Animaciones"
          textBtn={animations ? "Activado" : "Desactivado"}
          Icon={SparklesIcon}
          action={() => setAnimations(!animations)}
        />

        <ConfigOption
          label="Círculos de libros"
          textBtn={circles ? "Activado" : "Desactivado"}
          Icon={CircleIcon}
          action={() => setCircles(!circles)}
        />
      </div>

      {!isGuest && (
        <button
          type="button"
          onClick={forgetSession}
          className="mt-4 px-6 py-3 flex justify-center items-center gap-x-3 rounded-xl border-2 border-red-300/70 hover:border-red-400/80 hover:text-red-400  transition-colors text-red-300 text-lg"
        >
          <LogOutIcon size={24} />
          <span>Cerrar Sesión</span>
        </button>
      )}
    </animated.section>
  );
}
