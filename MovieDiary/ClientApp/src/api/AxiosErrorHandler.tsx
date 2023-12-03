import React, { ReactNode, useEffect, FC, useState } from "react";
import useAppContext from "../store/AppContext";
import useAuthContext from "../store/AuthContext";
import AxiosInstances from "./axiosInstances";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../routes";
import useRefreshToken from "../hooks/useRefreshToken";
import { getLocalStorage } from "../utils/getLocalStorage";

const AxiosErrorHandler: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useAppContext();
  const { logoutUser, currentUser } = useAuthContext();
  const refresh = useRefreshToken();

  useEffect(() => {
    console.log("UPDATED");

    const requestInterceptor = AxiosInstances.internal.interceptors.request.use(
      (config) => {
        const token = getLocalStorage("user")?.token;
        // If Authorization headers were already set, it's a re-try of 401 (below)
        if (token && !config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor =
      AxiosInstances.internal.interceptors.response.use(
        // Response handling
        (response) => response,

        //Error handling
        async (error: AxiosError) => {
          let prevRequest = error?.config;
          let refreshSent = false;
          console.log("TOTO JE ERROR", error);
          const { data, status, config, headers } =
            error.response as AxiosResponse;
          console.log(status);
          switch (status) {
            case 400:
              if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                router.navigate("/not-found");
              }
              if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                  if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else {
                setError({
                  isError: true,
                  message: "An error occured.",
                });
              }
              break;
            case 401:
              if (
                // Pokud je invalid token, tak usera odhlásíme
                status === 401 &&
                headers["www-authenticate"]?.startsWith(
                  'Bearer error="invalid_token'
                ) &&
                !refreshSent
              ) {
                refreshSent = true;

                const newAccessToken = await refresh();

                prevRequest!.headers.Authorization = `Bearer ${newAccessToken}`;
                return AxiosInstances.internal(prevRequest!);
              } else {
                console.log("Logging out.");
                // logoutUser();
                // router.navigate("/login");
                setError({ isError: true, message: "Unauthorized" });
              }
              break;
            case 403:
              setError({ isError: true, message: "Forbidden" });
              break;
            case 404:
              router.navigate("/not-found");
              break;
            case 500:
              router.navigate("/server-error");
              break;
          }
          return Promise.reject(error);
        }
      );

    return () => {
      AxiosInstances.internal.interceptors.request.eject(responseInterceptor);
      AxiosInstances.internal.interceptors.response.eject(requestInterceptor);
    };
  }, [setError, logoutUser, refresh, currentUser]);

  return children;
};

export default AxiosErrorHandler;
