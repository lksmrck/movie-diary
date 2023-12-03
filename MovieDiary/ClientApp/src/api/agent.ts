import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Movie } from "../models/Movie";
import { LoginFormValues, RegisterFormValues, User } from "../models/User";
import AxiosInstances from "./axiosInstances";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(
    url: string,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => AxiosInstances.internal.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: {}) =>
    AxiosInstances.internal.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    AxiosInstances.internal.put<T>(url, body).then(responseBody),
  del: <T>(url: string) =>
    AxiosInstances.internal.delete<T>(url).then(responseBody),
};

const Movies = {
  getAll: (userId: string, config: AxiosRequestConfig<any> | undefined) =>
    requests.get<Movie[]>(`/movies/user/${userId}`, config),
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
  refreshToken: () => requests.get<any>("/users/refreshToken"), //returns User místo any
};

// TMDB API Requests
const Search = {
  movie: (searchTerm: string) => {
    return AxiosInstances.external
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
    return AxiosInstances.external
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
