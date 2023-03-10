import axios from "axios";
import { getLocal, setLocal } from "@/utils";
import type { UserInfo, FileInfo } from "@/interface";

export interface ResDataBase<T> {
  code: number;
  message?: string;
  data: T;
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

request.interceptors.request.use((config) => {
  config.headers.Authorization = getLocal("token");
  return config;
});

request.interceptors.response.use((res) => {
  if (res.headers.authorization) {
    setLocal("token", res.headers.authorization);
  }
  return res;
});

export const login = <T>(data: any) => request.post<T>("/login", data);

export const signUp = <T>(data: any) => request.post<T>("/signup", data);

export const getUserInfo = () =>
  request.get<ResDataBase<UserInfo>>("/get_user_info");

export const uploadFile = (
  file: File,
  progressCallback: (percentage: number) => void
) => {
  const formData = new FormData();
  formData.append("myFile", file);

  return request.post<{ url: string }>("/upload_file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      const percentage = Math.round(
        (100 * event.loaded) / (event.total || file.size)
      );
      progressCallback(percentage);
    },
  });
};

export const getFileList = async <T>(data: T) => {
  const res = await request.post<ResDataBase<FileInfo[]>>(
    "/get_file_list",
    data
  );
  return res.data.data;
};

export default request;
