import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

import HomePage from "./views/home-page";
import AlbumPage from "./views/album-page";
import SettingPage from "./views/setting-page";
import UploadPage from "./views/upload-page";
import MainPage from "./views/main-page";
import Layout from "./layout";

const Login = React.lazy(() => import("./views/login"));
const Register = React.lazy(() => import("./views/register"));

dayjs.locale("zh-cn");

const App: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default React.memo(App);
