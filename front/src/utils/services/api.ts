import { loadFromLocalStorage } from "./localStorage";

export const getApiUrl = (endpoint: string) => {
  return `http://localhost:3307/api/${endpoint}`;
};

export const getAxiosHeaders = (
  contentType: string | undefined = "application/json"
) => {
  const token = loadFromLocalStorage("xToken", "");

  return {
    options: {
      withCredentials: true,
      headers: {
        "Content-Type": `${contentType}`,
        Authorization: `Bearer ${token}`,
      },
    },
  };
};
