import React from "react";
import { Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

import HomePage from "./views/home-page";
import Layout from "./layout";

dayjs.locale("zh-cn");

const MainPage = React.lazy(() => import("./views/main-page"));
const SettingPage = React.lazy(() => import("./views/setting-page"));
const UploadPage = React.lazy(() => import("./views/upload-page"));
const Login = React.lazy(() => import("./views/login"));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default React.memo(App);
