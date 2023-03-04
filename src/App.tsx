import React from "react";
import { Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

import MainPage from "./views/main-page";
import AlertPage from "./views/alert-page";
import ConfirmPage from "./views/confirm-page";
import FloatPage from "./views/float-page";
import Login from "./views/login";

dayjs.locale("zh-cn");

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/alert" element={<AlertPage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/float" element={<FloatPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
