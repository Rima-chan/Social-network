import { useAppSelector } from "./store";

export const useMyUser = () => useAppSelector((state) => state.user);

export const usePosts = () =>
  useAppSelector((state) => Object.values(state.posts));
