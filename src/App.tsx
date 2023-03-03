import React from "react";
import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";

import MainPage from "./views/main-page";
import AlertPage from "./views/alert-page";
import ConfirmPage from "./views/confirm-page";
import FloatPage from "./views/float-page";

dayjs.locale("zh-cn");

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/float" element={<FloatPage />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
