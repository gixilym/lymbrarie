"use client";
import { atom } from "recoil";

const inputSearch = atom({ key: "inputSearch", default: "" });

const checkboxValue = atom({ key: "checkboxValue", default: "" });

export { inputSearch, checkboxValue };
