import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
// import ErrorBoundary from "./Pages/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
// document.getElementsByName("Body").style.minHeight = "100vh";
// document.getElementById("root").style.backgroundColor = "#000";
root.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
