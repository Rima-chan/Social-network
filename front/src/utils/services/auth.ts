import { loadFromLocalStorage } from "./localStorage";

export const isAuth = () => {
  const token = loadFromLocalStorage("xsrfToken", "");
  return Boolean(token);
};
