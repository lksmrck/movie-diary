import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MoviesContextProvider } from "./store/MoviesContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AppContextProvider } from "./store/AppContext";
import AxiosErrorHandler from "./api/AxiosErrorHandler";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AppContextProvider>
      <AuthContextProvider>
        <AxiosErrorHandler>
          <MoviesContextProvider>
            <RouterProvider router={router} />
          </MoviesContextProvider>
        </AxiosErrorHandler>
      </AuthContextProvider>
    </AppContextProvider>
  </>
);
