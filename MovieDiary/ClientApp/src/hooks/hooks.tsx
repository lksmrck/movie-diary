import React, { useCallback, useEffect, useRef, useState } from "react";
import agent from "../api/agent";
import axios, { AxiosError } from "axios";

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
      if (!axios.isCancel()) {
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

const useRequest = (
  method: string,
  url: string,
  data: {},
  errorMessage: string,
  responseType: any
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios({ method, url, data, responseType });
    } catch (error) {}
  };
};
