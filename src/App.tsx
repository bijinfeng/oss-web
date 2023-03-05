import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useRequest } from "ahooks";

import MainPage from "./views/main-page";
import AlertPage from "./views/alert-page";
import ConfirmPage from "./views/confirm-page";
import FloatPage from "./views/float-page";
import Login from "./views/login";

import request from "@/request";
import useBearStore from "@/store/user";

dayjs.locale("zh-cn");

const App: React.FC = () => {
  const navigate = useNavigate();
  const setUserInfo = useBearStore((state) => state.setUserInfo);

  useRequest(() => request.get("/get_user_info"), {
    onSuccess: (res) => {
      const { code, data } = res.data;
      if (code === 1) {
        navigate("/login");
      } else {
        setUserInfo(data);
      }
    },
  });

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

export default React.memo(App);
