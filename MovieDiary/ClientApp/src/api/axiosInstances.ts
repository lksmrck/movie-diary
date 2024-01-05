import axios from "axios";

// Internal API config
const internal = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// External API config
const external = axios.create();

export const AxiosInstances = {
  internal,
  external,
};

export default AxiosInstances;
