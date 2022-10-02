import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage";
import userLogReducer from "../../queries/userLogInfos";

const reducer = combineReducers({
  user: userLogReducer,
});

const persistedState = {
  user: loadFromLocalStorage("user"),
  xsrfToken: loadFromLocalStorage("xsrfToken"),
};

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = configureStore({
  reducer,
  preloadedState: persistedState,
  devTool: reduxDevtools,
});

store.subscribe(
  throttle(() => {
    saveToLocalStorage({
      user: store.getState().user,
    });
  }, 1000)
);

export default store;
