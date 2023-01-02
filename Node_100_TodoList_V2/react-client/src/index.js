import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";

// querySelector : ES6+ 에서 권장
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
