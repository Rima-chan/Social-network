import { loadFromLocalStorage } from "./localStorage";

export const isAuth = () => {
  const localStorage = loadFromLocalStorage();
  return localStorage && !localStorage.user.data.error;
};
