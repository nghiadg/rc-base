import "./assets/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AppDialogMessageQueue, AppVersion } from "./components/common";
import { AppModalQueue } from "./components/common/AppModal";
import { RouterManager } from "./routers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterManager />
    <AppDialogMessageQueue />
    <AppModalQueue />
    <AppVersion version="9/3/2023, 2:23:26 PM" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
