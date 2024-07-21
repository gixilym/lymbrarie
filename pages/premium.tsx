import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component } from "@/utils/types";
import { useSpring, animated } from "@react-spring/web";
import { Check as CheckIcon, CircleHelp as HelpIcon } from "lucide-react";

function PremiumPage(): Component {
  const [animations] = useLocalStorage("animations", true);
  const [styles] = useSpring(() => ({
    from: { opacity: animations ? 0 : 1 },
    to: { opacity: 1 },
    config: { duration: 800 },
  }));

  return (
    <animated.section
      style={styles}
      className="flex flex-col gap-y-4 lg:flex-row justify-center items-center pt-20 h-full w-full min-h-screen sm:min-h-min"
    >
      <article className="h-[425px] w-[350px] bg-slate-800 text-white border-y-4 border-slate-400/60 rounded-lg flex flex-col justify-between items-center">
        <div className="px-8 pb-4 pt-6 w-full">
          <h2 className="text-3xl font-bold mb-4 capitalize">Plan gratuito</h2>
          <p className="text-[16px] mb-6">Tu inicio en Lymbrarie.</p>
          <p className="text-4xl font-bold mb-6">$0</p>
          <ul className="space-y-3 text-[16px] font-thin text-slate-100">
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>Con anuncios.</p>
            </li>
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>+25 libros gratis.</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <HelpIcon size={20} />
                </div>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content bg-base-100 rounded-box border border-slate-600 z-20 w-64 shadow"
                >
                  <div tabIndex={0} className="card-body">
                    <p>Podrás agregar hasta 25 libros gratis.</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="p-4 w-full">
          <button className="w-full cursor-default bg-slate-300 text-lg rounded-lg px-4 py-2 text-black">
            Adquirido
          </button>
        </div>
      </article>
      <div className="divider divider-horizontal" />
      <article className="h-[425px] w-[350px] bg-slate-800 text-white border-y-4 border-violet-600/60 rounded-lg flex flex-col justify-between items-center">
        <div className="px-8 pb-4 pt-6 w-full">
          <h2 className="text-3xl font-bold mb-4 capitalize">Plan lym</h2>
          <p className="text-[16px] mb-6">No pierdas tu progreso.</p>
          <p className="text-4xl font-bold mb-6">$2.99</p>
          <ul className="space-y-3 text-[16px] font-thin text-slate-100">
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>Sin anuncios.</p>
            </li>
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>+15 libros por mes.</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <HelpIcon size={20} />
                </div>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content bg-base-100 rounded-box border border-slate-600 w-64 shadow z-20"
                >
                  <div tabIndex={0} className="card-body">
                    <p>Podrás agregar hasta un máximo de 15 libros por mes.</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="p-4 w-full">
          <button className="w-full bg-violet-600 text-white text-lg rounded-lg px-4 py-2 hover:bg-violet-700">
            Adquirir
          </button>
        </div>
      </article>
      <div className="divider divider-horizontal" />
      <article className="h-[425px] w-[350px] mb-40 lg:mb-0 bg-slate-800 text-white border-y-4 border-yellow-600 rounded-lg overflow-hidden flex flex-col justify-between items-center">
        <div className="px-8 pb-4 pt-6 w-full">
          <h2 className="text-3xl font-bold mb-4 capitalize">Plan lym plus</h2>
          <p className="text-[16px] mb-6">Exclusivo para ávidos lectores.</p>
          <p className="text-4xl font-bold mb-6">$7.99</p>
          <ul className="space-y-3 text-[16px] font-thin text-slate-100">
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>Sin anuncios.</p>
            </li>
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>+35 libros por mes.</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <HelpIcon size={20} />
                </div>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content bg-base-100 rounded-box border border-slate-600 z-20 w-64 shadow"
                >
                  <div tabIndex={0} className="card-body">
                    <p>Podrás agregar hasta un máximo de 35 libros por mes.</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>Recomendaciones.</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <HelpIcon size={20} />
                </div>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content bg-base-100 rounded-box border border-slate-600 z-20 w-64 shadow"
                >
                  <div tabIndex={0} className="card-body">
                    <p>Obtendrás recomendaciones basadas en tus lecturas.</p>
                  </div>
                </div>
              </div>
            </li>

            <li className="flex justify-start gap-x-2 items-center">
              <CheckIcon size={20} color="#fff" />
              <p>24/7 Soporte.</p>
            </li>
          </ul>
        </div>
        <div className="p-4 w-full">
          <button className="w-full bg-yellow-500 text-black text-lg rounded-lg px-4 py-2 hover:bg-yellow-600">
            Adquirir
          </button>
        </div>
      </article>
    </animated.section>
  );
}

export default PremiumPage;
