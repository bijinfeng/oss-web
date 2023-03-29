import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

import HomePage from "@/views/home-page";
import AlbumPage from "@/views/album-page";
import SettingPage from "@/views/setting-page";
import UploadPage from "@/views/upload-page";
import MainPage, { loader as MainLoader } from "@/views/main-page";
import Layout from "@/layout";

const Login = React.lazy(() => import("@/views/login"));
const Register = React.lazy(() => import("@/views/register"));
const NotFound = React.lazy(() => import("@/views/404"));
const ForgetPassword = React.lazy(() => import("@/views/forget-password"));

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
        loader: MainLoader,
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
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(rootRouter, {
  basename: import.meta.env.BASE_URL,
});
