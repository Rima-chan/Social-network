import { useState } from "react";

export function useSubmitForm(url, body) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  if (!url) return;
  const fetchData = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "text/html",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    fetchData(body);
    e.target.reset();
  };
  return { onSubmit, isLoading, data, error };
}
