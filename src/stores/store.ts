import { writable } from "svelte/store";
import type User from "../constants/user";
import type { FacultiesUNS, GENDER } from "../constants/user";
import { UNIVS } from "../constants/universities";

export const userId = writable<string>("")
export const userUniv = writable<string>("");
export const userData = writable<User>({ user_id: "", univ: UNIVS.UNS, gender: "Loading.." as GENDER, age: 0, faculty: "Loading.." as FacultiesUNS });