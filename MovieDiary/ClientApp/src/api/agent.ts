import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import { router } from "../routes";
import { Movie } from "../models/Movie";
import { LoginFormValues, RegisterFormValues, User } from "../models/User";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => {
  console.log(response.data);
  return response.data;
};

//const callWithoutInterceptors = axios.request({url});

axios.interceptors.request.use((config) => {
  // const token = store.commonStore.token;
  const token = null;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
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
          //toast.error(data);
        }
        break;
      case 401:
        // toast.error("unauthorised");
        break;
      case 403:
        //toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        //store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Movies = {
  getAll: () => requests.get<Movie[]>(`/movies`),
  getOne: (id: string) => requests.get<Movie>(`/movies/${id}`),
  create: (movie: Movie) => requests.post<void>(`/movies`, movie),
  //   update: (movie: MovieFormValues) =>
  //     requests.put<void>(`/movies/${movie.id}`, movie),
  delete: (id: string) => requests.del<void>(`/movies/${id}`),
};

const Comments = {};

const Categories = {};

const Account = {
  current: () => requests.get<User>("account"),
  login: (user: LoginFormValues) => requests.post<User>("/account/login", user),
  register: (user: RegisterFormValues) =>
    requests.post<User>("/account/register", user),
};

// Vypnuté req i res interceptory, pak přidat res!
const Search = {
  movie: (searchTerm: string) => {
    return axios
      .request({
        baseURL: process.env.REACT_APP_MOVIES_SEARCH_URL,
        url: searchTerm,
        method: "get",
        validateStatus: null,
      })
      .then(responseBody);
  },
};

const agent = {
  Movies,
  Comments,
  Categories,
  Account,
  Search,
};

export default agent;
