import type { Component } from "@/utils/types";

function NoMatchesText(): Component {
  return (
    <p
      id="no-matches"
      className=" text-gray-200/70 text-2xl font-public font-normal w-full text-center mt-8"
    >
      Sin coincidencias...
    </p>
  );
}

export default NoMatchesText;
