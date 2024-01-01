import { ReactNode, useEffect, useState, FC } from "react";
import useAuthContext from "../store/AuthContext";
import AxiosInstances from "./axiosInstances";
import { AxiosError, AxiosResponse } from "axios";
import { router } from "../routes";
import useRefreshToken from "../hooks/useRefreshToken";
import { getLocalStorage, getSessionStorage } from "../utils/getLocalStorage";
import { toast } from "react-toastify";

const AxiosInterceptors: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const { logoutUser, currentUser } = useAuthContext();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = AxiosInstances.internal.interceptors.request.use(
      (config) => {
        // const token = getSessionStorage("user")?.token;
        const token = getLocalStorage("user")?.token;
        // If Authorization headers were already set, it's a re-try of 401 (below)
        if (token && !config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    console.log("YO");
    const responseInterceptor =
      AxiosInstances.internal.interceptors.response.use(
        // Response handling
        (response) => response,

        //Error handling
        async (error: AxiosError) => {
          let prevRequest = error?.config;
          let refreshSent = false;
          const { data, status, config, headers } =
            error.response as AxiosResponse;
          switch (status) {
            case 400:
              if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                router.navigate("/not-found");
              }
              // else {
              //   router.navigate("/bad-request");
              // }
              if (data.errorMessage) {
                // const modalStateErrors = [];
                // for (const key in data.errors) {
                //   if (data.errors[key]) {
                //     modalStateErrors.push(data.errors[key]);
                //   }
                // }
                // throw modalStateErrors.flat();
                toast.error(data.errorMessage);
              } else {
                toast.error("An error occured");
              }
              break;
            case 401:
              if (
                // Pokud je invalid token, tak usera odhlásíme
                status === 401 &&
                headers["www-authenticate"]?.startsWith(
                  // 'Bearer error="invalid_token'
                  "Bearer"
                ) &&
                !refreshSent
              ) {
                refreshSent = true;
                const newAccessToken = await refresh();
                prevRequest!.headers.Authorization = `Bearer ${newAccessToken}`;
                return AxiosInstances.internal(prevRequest!);
              } else {
                console.log("Logging out.");
                logoutUser();
                router.navigate("/login");
                toast.error("Unauthorized");
              }
              break;
            case 403:
              toast.error("Forbidden");
              break;
            case 404:
              router.navigate("/not-found");
              break;
            case 500:
              router.navigate("/server-error");
              break;
          }
          return Promise.resolve(error);
        }
      );
    setIsSet(true);

    return () => {
      AxiosInstances.internal.interceptors.request.eject(responseInterceptor);
      AxiosInstances.internal.interceptors.response.eject(requestInterceptor);
    };
  }, []);

  return isSet && children;
};

export default AxiosInterceptors;
