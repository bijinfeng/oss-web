import React from "react";
import { useRoutes, RouteObject } from "react-router-dom";

import HomePage from "@/views/home-page";
import AlbumPage from "@/views/album-page";
import SettingPage from "@/views/setting-page";
import UploadPage from "@/views/upload-page";
import MainPage from "@/views/main-page";
import Layout from "@/layout";

const Login = React.lazy(() => import("@/views/login"));
const Register = React.lazy(() => import("@/views/register"));
const NotFound = React.lazy(() => import("@/views/404"));

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/albums",
        element: <AlbumPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
