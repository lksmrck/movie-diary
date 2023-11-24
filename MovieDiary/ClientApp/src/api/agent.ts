import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import { Movie } from "../models/Movie";
import { LoginFormValues, RegisterFormValues, User } from "../models/User";
import { getLocalStorage } from "../utils/getLocalStorage";

axios.defaults.baseURL = "https://localhost:7173/api";
axios.defaults.withCredentials = true;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//const callWithoutInterceptors = axios.request({url});

axios.interceptors.request.use((config) => {
  const token = getLocalStorage("user")?.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Movies = {
  getAll: (userId: string) => requests.get<Movie[]>(`/movies/user/${userId}`),
  getOne: (movieId: string) => requests.get<Movie>(`/movies/${movieId}`),
  create: (movie: Movie) => requests.post<void>(`/movies`, movie),
  //   update: (movie: MovieFormValues) =>
  //     requests.put<void>(`/movies/${movie.id}`, movie),
  delete: (id: string) => requests.del<void>(`/movies/${id}`),
};

const Comments = {};

const Categories = {};

const Users = {
  current: () => requests.get<User>("/users/current"), // DODELAT
  login: (user: LoginFormValues) =>
    requests.post<ApiResponse>("/users/login", user),
  register: (user: RegisterFormValues) =>
    requests.post<ApiResponse>("/users/register", user),
  refreshToken: () => requests.post<any>("/users/refreshToken", {}), //returns User místo any
};

// Vypnuté req i res interceptory, pak přidat res!

// TMDB API Requests
const Search = {
  movie: (searchTerm: string) => {
    return axios
      .request({
        baseURL: process.env.REACT_APP_MOVIES_SEARCH_URL,
        url: searchTerm,
        method: "get",
        validateStatus: null,
      })
      .then((res) =>
        res.data.results.map((m: any) => {
          // console.log(res.data.results);
          // Destructuring and take only few properties from whole object
          return (({
            title,
            poster_path,
            release_date,
            vote_average,
            overview,
            backdrop_path,
            genre_ids,
          }) => ({
            title,
            poster_path,
            release_date,
            vote_average,
            overview,
            backdrop_path,
            genre_ids,
          }))(m);
        })
      );
  },
  // Vrátí názvy žánrů podle jejich IDs
  categories: (genreIds: number[]) => {
    return axios
      .request({
        baseURL: process.env.REACT_APP_CATEGORIES_SEARCH_URL,
        method: "get",
        validateStatus: null,
      })
      .then((res) =>
        genreIds.map(
          (id) =>
            res.data.genres.find(
              (g: { id: number; name: string }) => g.id === id
            )?.name
        )
      );
  },
};

const agent = {
  Movies,
  Comments,
  Categories,
  Users,
  Search,
};

export default agent;

type ApiResponse = {
  errorMessages: string[];
  isSuccess: boolean;
  result: any;
  statusCode: number;
};
