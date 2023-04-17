import { writable } from "svelte/store";

export const HOME_PAGE = 0;
export const MAIN_PAGE = 1;
export const SETTINGS_PAGE = 2;

export const pageStore = writable(HOME_PAGE);
