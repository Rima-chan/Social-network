import { combineReducers, createStore } from "redux";
import throttle from "lodash/throttle";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./services/localStorage";
import userLogReducer from "../features/userLogInfos";

const reducer = combineReducers({
  user: userLogReducer,
});

const persistedState = loadFromLocalStorage();

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, persistedState, reduxDevtools);

store.subscribe(
  throttle(() => {
    saveToLocalStorage({
      user: store.getState().user,
    });
  }, 1000)
);

export default store;
