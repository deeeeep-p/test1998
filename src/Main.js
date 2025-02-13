import React from "react";
import App from "./App";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import { Routes, Route } from "react-router";
const Main = () => {
  return (
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<NotFound />} />
    </Routes>
  );
};

// #endregion

export default Main;
