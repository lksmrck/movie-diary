import React, { useCallback, useEffect, useRef, useState } from "react";
import agent from "../api/agent";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../routes";
import { Snackbar } from "@mui/material";
import useAppContext from "../store/AppContext";
import useAuthContext from "../store/AuthContext";
import AxiosInstances from "../api/axiosInstances";

export const useFetch = (url: string, defaultData: {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState<any>(null);

  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    let response;
    try {
      response = await axios.get(`localhost:3000/api/${url}`);
      if (isMounted.current) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        if (isMounted.current) {
          setError(error);
          setIsLoading(false);
        }
      }
    }
    return response;
  }, [setData, url]);

  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  return {
    data,
    error,
    setError,
    isLoading,
    fetch: fetchData,
    setData,
  };
};

// const useRequest = (
//   method: string,
//   url: string,
//   data: {},
//   errorMessage: string,
//   responseType: any
// ) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<any>(null);

//   const sendRequest = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios({ method, url, data, responseType });
//     } catch (error) {}
//   };
// };

export const useTypingDebounce = (callback: () => void, time: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("" as any);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        callback();
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, time);

    return () => {
      clearTimeout(debounce);
      setIsLoading(false);
    };
  }, [debouncedSearchTerm]);

  return {
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    isLoading,
  };
};

// Registruje klik mimo komponent předaný v ref a provede akci z parametru
export const useClickOutside = (ref: any, actionCallback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        actionCallback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};