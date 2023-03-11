import axios from "axios";

const request = axios.create({
  baseURL: "https://iqqgucwq2n.hk.aircode.run",
});

export const login = <T>(data: T) => request.post("/login", data);

/**
 * 上传文件
 * @param file
 * @returns
 */
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

export default request;
