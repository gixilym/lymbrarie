"use client";
import { motion } from "framer-motion";
import {
  Rows3 as LayoutIcon,
  List as ListIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import type { MouseEventHandler } from "react";
import { Component } from "./types";

const BackSVG = ({ route }: { route: string }): Component => {
  const router: AppRouterInstance = useRouter();
  return (
    <div
      className=" absolute top-0 right-2 sm:right-0 w-8 h-8 opacity-80 cursor-pointer"
      onClick={() => router.push(route)}
    >
      <svg fill="#C0C0C0" viewBox="0 0 72 72">
        <path d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255 c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489 c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021 C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57 c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506 c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414 c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z"></path>
      </svg>
    </div>
  );
};

const ReadSVG = (): Component => (
  <svg
    className="w-4 h-4 "
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ArrowSVG = (): Component => (
  <svg viewBox="0 0 24 24" fill="none" width={30} height={30}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 12.0002C5.00024 8.66068 7.35944 5.78639 10.6348 5.1351C13.9102 4.48382 17.1895 6.23693 18.4673 9.32231C19.7451 12.4077 18.6655 15.966 15.8887 17.8212C13.1119 19.6764 9.41127 19.3117 7.05 16.9502C5.73728 15.6373 4.99987 13.8568 5 12.0002Z"
      stroke="#dbdbdbac"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 10.0002L13 12.0002L11 14.0002"
      stroke="#dbdbdbac"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReadingSVG = (): Component => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.749937,2.00096718 C18.9408009,2.00096718 19.9155819,2.92612877 19.9947461,4.09691837 L19.999937,4.25096718 L19.999937,19.7490328 C19.999937,20.9398968 19.0747754,21.9146777 17.9039858,21.993842 L17.749937,21.9990328 L6.25006305,21.9990328 C5.05919905,21.9990328 4.08441813,21.0738712 4.00525386,19.9030816 L4.00006305,19.7490328 L4.00006305,4.25096718 C4.00006305,3.06010319 4.92522464,2.08532227 6.09601423,2.006158 L6.25006305,2.00096718 L17.749937,2.00096718 Z M17.749937,3.50096718 L6.25006305,3.50096718 C5.87036728,3.50096718 5.55657209,3.78312106 5.50690966,4.14919663 L5.50006305,4.25096718 L5.50006305,19.7490328 C5.50006305,20.1287286 5.78221693,20.4425238 6.14829249,20.4921862 L6.25006305,20.4990328 L17.749937,20.4990328 C18.1296327,20.4990328 18.4434279,20.2168789 18.4930903,19.8508034 L18.499937,19.7490328 L18.499937,4.25096718 C18.499937,3.87127142 18.2177831,3.55747622 17.8517075,3.5078138 L17.749937,3.50096718 Z M12.248125,12.997298 C12.6623386,12.997298 12.998125,13.3330845 12.998125,13.747298 C12.998125,14.1269938 12.7159712,14.440789 12.3498956,14.4904514 L12.248125,14.497298 L7.75,14.497298 C7.33578644,14.497298 7,14.1615116 7,13.747298 C7,13.3676023 7.28215388,13.0538071 7.64822944,13.0041447 L7.75,12.997298 L12.248125,12.997298 Z M16.25,9.99864902 C16.6642136,9.99864902 17,10.3344355 17,10.748649 C17,11.1283448 16.7178461,11.44214 16.3517706,11.4918024 L16.25,11.498649 L7.75,11.498649 C7.33578644,11.498649 7,11.1628626 7,10.748649 C7,10.3689533 7.28215388,10.0551581 7.64822944,10.0054956 L7.75,9.99864902 L16.25,9.99864902 Z M16.25,7 C16.6642136,7 17,7.33578644 17,7.75 C17,8.12969577 16.7178461,8.44349096 16.3517706,8.49315338 L16.25,8.5 L7.75,8.5 C7.33578644,8.5 7,8.16421356 7,7.75 C7,7.37030423 7.28215388,7.05650904 7.64822944,7.00684662 L7.75,7 L16.25,7 Z" />
  </svg>
);

const PendingSVG = (): Component => (
  <svg width={25} className="" viewBox="0 0 24 24" fill="#fff">
    <path
      d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ListSVG = ({ onClick }: { onClick: MouseEventHandler }): Component => (
  <motion.svg
    whileHover={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
    onClick={onClick}
    className="mt-1 duration-300 cursor-pointer"
    viewBox="0 0 24 24"
    fill="none"
    width={30}
    height={30}
  >
    <ListIcon size={25} />
  </motion.svg>
);

const LayoutSVG = ({ onClick }: { onClick: MouseEventHandler }): Component => (
  <motion.svg
    whileHover={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
    onClick={onClick}
    className="mt-2 duration-300 cursor-pointer"
    viewBox="0 0 24 24"
    fill="none"
    width={30}
    height={30}
  >
    <LayoutIcon size={22} />
  </motion.svg>
);

const ToggleDetailsIcon = ({
  showDetails,
  onClick,
}: {
  showDetails: boolean;
  onClick: MouseEventHandler;
}): Component =>
  showDetails ? <LayoutSVG onClick={onClick} /> : <ListSVG onClick={onClick} />;

const SettingsSVG = (): Component => (
  <div tabIndex={0} role="button">
    <button className="btn btn-square btn-ghost w-8">
      <SettingsIcon size={35} />
    </button>
  </div>
);

export {
  ArrowSVG,
  BackSVG,
  LayoutSVG,
  ListSVG,
  PendingSVG,
  ReadingSVG,
  ReadSVG,
  SettingsSVG,
  ToggleDetailsIcon,
};
