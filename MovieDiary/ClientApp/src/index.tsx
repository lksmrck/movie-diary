import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MoviesContextProvider } from "./store/MoviesContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AppContextProvider } from "./store/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AppContextProvider>
      <AuthContextProvider>
        <MoviesContextProvider>
          <RouterProvider router={router} />
        </MoviesContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  </>
);
