import apiUrlGenerator from "../utils/services/apiUrl";
import { loadFromLocalStorage } from "../utils/services/localStorage";

export async function createPost(formData) {
  const user = loadFromLocalStorage();
  console.log("user :>> ", user);
  const { xsrfToken } = user.user.data.xsrfToken;
  const url = apiUrlGenerator("posts");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "x-xsrf-token": `${xsrfToken}`,
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data :>> ", data);
  } catch (e) {
    console.log(e);
  }
}
