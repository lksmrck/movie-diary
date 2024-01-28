import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Category, Movie } from "../models/Movie";
import { LoginFormValues, RegisterFormValues, User } from "../models/User";
import AxiosInstances from "./axiosInstances";
import { ApiResponse } from "../models/ApiResponse";
import { toast } from "react-toastify";

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstances.internal.get<T>(url, config),
  post: <T>(url: string, body: {}) => {
    return AxiosInstances.internal.post<T>(url, body);
  },
  del: <T>(url: string) => AxiosInstances.internal.delete<T>(url),
};

const Movies = {
  getAll: (userId: string, config?: AxiosRequestConfig<any> | undefined) =>
    requests
      .get<ApiResponse<Movie[]>>(`/movies/user/${userId}`, config)
      .then((res: any) => {
        if (res?.data?.isSuccess) {
          return res?.data;
        }
        return;
      }),
  // getOne: (movieId: string) => requests.get<Movie>(`/movies/${movieId}`),
  create: (movie: Movie) =>
    requests
      .post<ApiResponse<Movie>>(`/movies`, movie)
      .then((res: AxiosResponse<ApiResponse<Movie>>) => {
        console.log("AG", res);
        if (res?.data?.isSuccess) {
          toast.success("Movie was successfully added");
          return res?.data?.result;
        } else {
          // Custom API error message při 200 status codu
          if (res?.data?.errorMessage) toast.error(res.data.errorMessage);
          return;
        }
      }),
  delete: (id: string) =>
    requests
      .del<ApiResponse<void>>(`/movies/${id}`)
      .then((res: AxiosResponse<ApiResponse<void>>) => {
        if (res?.data?.isSuccess) {
          toast.success("Movie was successfully deleted");
          return res?.data!;
        }
        return;
      }),
};

const Comments = {
  createOrEdit: (comment: {
    id: string;
    text: string;
    movieID: string;
    userID: string;
  }) =>
    requests
      .post<ApiResponse<any>>(`/comments/createOrEdit`, comment)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("Comment sucessfully updated.");
          return res.data;
        }
      }),
};

const Ratings = {
  createOrEdit: (rating: {
    id: string | undefined;
    value: number;
    movieID: string;
    userID: string;
  }) =>
    requests
      .post<ApiResponse<any>>(`/ratings/createOrEdit`, rating)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("Rating sucessfully updated.");
          return res.data;
        }
      }),
};

const Categories = {
  getAll: (userId: string, config: AxiosRequestConfig<any> | undefined) =>
    requests.get<ApiResponse<Category[]>>(`/categories/${userId}`, config),
  create: (userId: string, category: Category) =>
    requests
      .post<ApiResponse<Category[]>>(`/categories/${userId}`, category)
      .then((res) => {
        try {
          if (res.data.isSuccess) {
            toast.success("Category was successfully created");
            return res.data;
          }
          toast.error(res.data.errorMessage);
        } catch (error) {
          toast.error("An error occured during creating the category");
        }
      }),
};

const Users = {
  current: () => requests.get<User>("/users/current"), // DODELAT
  login: (user: LoginFormValues) =>
    requests.post<ApiResponse<any>>("/users/login", user).then((res) => {
      try {
        if (res.data) {
          toast.success("Successfully logged in");
          return res.data;
        }
      } catch (error) {
        toast.error("An error occured during the login");
      }
    }),
  register: (user: RegisterFormValues) =>
    requests.post<ApiResponse<any>>("/users/register", user).then((res) => {
      try {
        if (res.data) {
          toast.success("Successfully registered");
          return res.data;
        }
      } catch (error) {
        toast.error("An error occured during the registration");
      }
    }),
  refreshToken: () => requests.get<ApiResponse<User>>("/users/refreshToken"),
};

const Statistics = {
  get: (userId: string) =>
    requests.get<ApiResponse<any>>(`/statistics/${userId}`),
};

// TMDB API Requests
const Search = {
  movie: (searchTerm: string) => {
    return AxiosInstances.external
      .request({
        baseURL: import.meta.env.VITE_MOVIES_SEARCH_URL,
        url: searchTerm,
        method: "get",
        validateStatus: null,
      })
      .then((res) =>
        res.data.results.map((m: any) => {
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
        baseURL: import.meta.env.VITE_CATEGORIES_SEARCH_URL,
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
  Ratings,
  Categories,
  Users,
  Search,
  Statistics,
};

export default agent;
