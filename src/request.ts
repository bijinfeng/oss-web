import axios from "axios";

const request = axios.create({
  baseURL: "https://iqqgucwq2n.hk.aircode.run",
});

export const login = <T>(data: T) => request.post("/login", data);

export default request;
