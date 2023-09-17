import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
// import { AuthContextProvider } from "./context/AuthContext";

import { router } from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    {/* <AuthContextProvider> */}
    <RouterProvider router={router} />
    {/* </AuthContextProvider> */}
  </>
);
