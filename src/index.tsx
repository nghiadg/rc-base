import "./assets/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./Main";
import reportWebVitals from "./reportWebVitals";
import { AppVersion } from "./components/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Main />
    <AppVersion version="8/27/2023, 12:08:51 PM"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
