import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MoviesContextProvider } from "./store/MoviesContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AppContextProvider } from "./store/AppContext";
import AxiosErrorHandler from "./api/AxiosErrorHandler";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AppContextProvider>
      <AuthContextProvider>
        <MoviesContextProvider>
          <AxiosErrorHandler>
            <ErrorBoundary>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </AxiosErrorHandler>
        </MoviesContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  </>
);
