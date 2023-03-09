import React from "react";
import { Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

import HomePage from "./views/home-page";
import MainPage from "./views/main-page";
import SettingPage from "./views/setting-page";
import UploadPage from "./views/upload-page";
import Login from "./views/login";

import Layout from "./layout";

dayjs.locale("zh-cn");

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
