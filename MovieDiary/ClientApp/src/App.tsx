import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
// import { Layout } from './components/Layout';

const App = () => {
  return (
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />;
      })}
    </Routes>
  );
};

export default App;
