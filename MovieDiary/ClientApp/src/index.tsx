import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./context/AuthContext";
import App from "./App.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    {/* <AuthContextProvider> */}
    <App />
    {/* </AuthContextProvider> */}
  </BrowserRouter>
);
