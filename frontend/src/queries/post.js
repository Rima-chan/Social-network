import apiUrlGenerator from "../utils/services/apiUrl";
import { loadFromLocalStorage } from "../utils/services/localStorage";

export async function createPost(formData) {
  const xsrfToken = loadFromLocalStorage("xsrfToken");
  const url = apiUrlGenerator("posts");
  console.log("formData :>> ", formData);
  console.log(Object.fromEntries(formData));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-xsrf-token": `${xsrfToken}`,
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    console.log("data :>> ", data);
  } catch (e) {
    console.log(e);
  }
}
