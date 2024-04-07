import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice, { EMPTY_USER } from "./userSlice";
import { loadFromLocalStorage } from "../services/localStorage";
import postSlice from "./postSlice";

const persistedState = {
  user: loadFromLocalStorage("user", EMPTY_USER),
};

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postSlice,
  },
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
