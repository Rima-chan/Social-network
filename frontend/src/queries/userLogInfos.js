import { produce } from "immer";
import { selectUserLogState } from "../utils/redux/selectors";
import apiUrlGenerator from "../utils/services/apiUrl";

const FETCHING = "userLog/fetching";
const RESOLVED = "userLog/resolved";
const REJECTED = "userLog/rejected";

const initialState = {
  status: "void",
  data: null,
  error: null,
};

const userLogFetching = () => ({
  type: FETCHING,
});

const userLogResolved = (data) => ({
  type: RESOLVED,
  payload: { data },
});

const userLogRejected = (error) => ({
  type: REJECTED,
  payload: { error },
});

export async function fetchUserLogInfos(store, formData) {
  const status = selectUserLogState(store.getState())?.status;
  if (status === "pending" || status === "updating") {
    return;
  }
  const url = apiUrlGenerator("users/login");
  store.dispatch(userLogFetching());
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
    store.dispatch(userLogResolved(data));
  } catch (e) {
    store.dispatch(userLogRejected(e));
  }
}

export default function userLogReducer(state = initialState, action) {
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
