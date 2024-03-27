"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useSearchParams } from "next/navigation";
import { NextRouter, useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

function ToggleTheme() {
  const router: NextRouter = useRouter(),
    params: Params = useSearchParams(),
    theme: string = params.get("theme") == "sunset" ? "pastel" : "sunset";

  function changeTheme() {
    const body: any = document.querySelector("body");
    if (theme == "pastel") {
      body.style.backgroundColor = "#eaeaea";
      router.push({ pathname: "/", query: { theme } }, undefined, {
        shallow: true,
      });
    } else {
      body.style.backgroundColor = "#020617";
      router.push({ pathname: "/", query: { theme } }, undefined, {
        shallow: true,
      });
    }
  }

  return (
    <label onClick={changeTheme} className="flex cursor-pointer gap-2 z-10">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={twMerge(theme == "sunset" ? "#363636" : "#ffffffbe")}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        defaultChecked={theme == "pastel"}
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={twMerge(theme == "sunset" ? "#363636" : "#ffffffbe")}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
}

export default ToggleTheme;
