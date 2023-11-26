import React, { ReactNode, useEffect, FC } from "react";
import useAppContext from "../store/AppContext";
import useAuthContext from "../store/AuthContext";
import AxiosInstances from "./axiosInstances";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../routes";

const AxiosErrorHandler: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useAppContext();
  const { logoutUser } = useAuthContext();
  console.log("1");

  //   useEffect(() => {
  //     AxiosInstances.internal.interceptors.response.use(
  //       (response) => response,
  //       async (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }, []);

  useEffect(() => {
    console.log("2");
    const responseInterceptor =
      AxiosInstances.internal.interceptors.response.use(
        async (response) => {
          console.log("3");
          return response;
        },
        async (error: AxiosError) => {
          console.log(error);
          const { data, status, config, headers } =
            error.response as AxiosResponse;

          //   switch (status) {
          //     case 400:
          //       if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          //         router.navigate("/not-found");
          //       }
          //       if (data.errors) {
          //         const modalStateErrors = [];
          //         for (const key in data.errors) {
          //           if (data.errors[key]) {
          //             modalStateErrors.push(data.errors[key]);
          //           }
          //         }
          //         throw modalStateErrors.flat();
          //       } else {
          //         //toast.error(data);
          //       }
          //       break;
          //     case 401:
          //       if (
          //         // Pokud je invalid token, tak usera odhlásíme
          //         status === 401 &&
          //         headers["www-authenticate"]?.startsWith(
          //           'Bearer error="invalid_token'
          //         )
          //       ) {
          //         logoutUser();
          //         setError({
          //           isError: true,
          //           message: "Session expired - please login again.",
          //         });
          //       } else {
          //         setError({ isError: true, message: "Unauthorized" });
          //       }
          //       break;
          //     case 403:
          //       setError({ isError: true, message: "Forbidden" });
          //       break;
          //     case 404:
          //       router.navigate("/not-found");
          //       break;
          //     case 500:
          //       //store.commonStore.setServerError(data);
          //       router.navigate("/server-error");
          //       break;
          //   }
          //   return Promise.reject(error);
        }
      );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setError, logoutUser]);

  return children;
};

export default AxiosErrorHandler;
