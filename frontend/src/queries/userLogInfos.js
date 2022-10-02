import { produce } from "immer";
import { selectUser } from "../utils/redux/selectors";
import apiUrlGenerator from "../utils/services/apiUrl";
import { saveToLocalStorage } from "../utils/services/localStorage";

const FETCHING = "userLog/fetching";
const RESOLVED = "userLog/resolved";
const REJECTED = "userLog/rejected";

const initialState = {
  status: "void",
  data: null,
  error: null,
};

const userFething = () => ({
  type: FETCHING,
});

const userResolved = (data) => ({
  type: RESOLVED,
  payload: { data },
});

const userRejected = (error) => ({
  type: REJECTED,
  payload: { error },
});

export async function fetchUser(store, formData) {
  const status = selectUser(store.getState())?.status;
  if (status === "pending" || status === "updating") {
    return;
  }
  const url = apiUrlGenerator("users/login");
  store.dispatch(userFething());
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "text/html",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    saveToLocalStorage("xsrfToken", data.xsrfToken);
    saveToLocalStorage("user", data.user);
    store.dispatch(userResolved(data.user));
  } catch (e) {
    store.dispatch(userRejected(e));
  }
}

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
        if (draft.status === "void") {
          draft.status = "pending";
          return;
        }
        if (draft.status === "rejected") {
          draft.error = null;
          draft.status = "pending";
          return;
        }
        if (draft.status === "resolved") {
          draft.status = "updating";
          return;
        }
        return;
      }
      case RESOLVED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.data = action.payload.data;
          draft.status = "resolved";
          return;
        }
        return;
      }
      case REJECTED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.data = null;
          draft.error = action.payload;
          draft.status = "rejected";
          return;
        }
        return;
      }
      default:
        return;
    }
  });
}
