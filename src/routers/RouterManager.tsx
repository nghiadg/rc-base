import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Page } from "./routers.const";
import { UiKit } from "../pages";
import { AuthRouter } from "./AuthRouter";

export const RouterManager = () => {
  if (false) {
    return <AuthRouter />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Page.Login}
          element={<Navigate replace to={Page.UiKit} />}
        />
        <Route path={Page.UiKit} element={<UiKit />} />
        <Route path="*" element={<Navigate replace to={Page.UiKit} />} />
      </Routes>
    </BrowserRouter>
  );
};
