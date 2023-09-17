import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddMovie from "./pages/AddMovie";

import App from "./App";
import MyMovies from "./pages/MyMovies";
import NotFound from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";
import Discover from "./pages/Discover";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "my-movies", element: <MyMovies /> },
      { path: "add-movie", element: <AddMovie /> },
      { path: "discover", element: <Discover /> },
      { path: "login", element: <Login /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
