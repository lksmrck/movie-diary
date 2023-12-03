import axios from "axios";
import { getLocalStorage } from "../utils/getLocalStorage";

// Internal API config
const internal = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// internal.interceptors.request.use(
//   (config) => {
//     const token = getLocalStorage("user")?.token;
//     if (token && config.headers)
//       config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// External API config
const external = axios.create();

export const AxiosInstances = {
  internal,
  external,
};

export default AxiosInstances;
