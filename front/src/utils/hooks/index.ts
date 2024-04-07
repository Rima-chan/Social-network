import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { loadFromLocalStorage } from "../services/localStorage";
import { useSnackbar } from "../context/snackbar";
import { AxiosError } from "axios";

export const useAxios = <T, ReturnType>(
  {
    url,
    method,
    body,
    options,
    allowFetch = true,
  }: {
    url: string;
    method: string;
    allowFetch?: boolean;
    body?: T;
    options?: AxiosRequestConfig;
  },
  onSuccess?: (data: ReturnType | null) => void
) => {
  const { showSnackbar } = useSnackbar();

  const [data, setData] = useState<ReturnType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data: body,
        withCredentials: true,
        ...options,
      });
      setData(response.data);
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setError(true);
      console.log("err", err);
      if (isAxiosError(err)) {
        const error: AxiosError<{ message: string }> = err;
        showSnackbar({ type: "error", message: error.response?.data.message });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === "get" && allowFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url]);

  useEffect(() => {
    if (!allowFetch) {
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, allowFetch]);

  return { data, isLoading, error, fetchData };
};

export const useToken = () => {
  const token = loadFromLocalStorage("xsrfToken", "");
  return Boolean(token);
};

export const useFileReader = (
  file: File | null | undefined,
  setImageUrl: (url: string) => void
) => {
  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target || { result: undefined };
        if (result && !isCancel) {
          setImageUrl(result.toString());
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, setImageUrl]);
};

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
