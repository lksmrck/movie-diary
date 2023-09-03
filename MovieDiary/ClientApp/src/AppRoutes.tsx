import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default AppRoutes;
