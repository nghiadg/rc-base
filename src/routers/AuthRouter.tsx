import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Page } from "./routers.const";

export const AuthRouter = () => {
  const redirectUrl = useMemo(() => {
    const [, path] = window.location.href.split(window.location.origin);
    const redirectUrlParam = new URLSearchParams({
      redirect: path,
    });

    return [Page.Login, "?", redirectUrlParam].join("");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Page.Login} element={<div>Login Page</div>} />
        <Route path="*" element={<Navigate replace to={redirectUrl} />} />
      </Routes>
    </BrowserRouter>
  );
};
