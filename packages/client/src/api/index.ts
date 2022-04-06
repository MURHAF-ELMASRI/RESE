import { SingupProps } from "@rese/client-server/api/signup";
import { verifyCodeArgs } from "@rese/client-server/api/verifyCode";
import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token") && req.headers) {
    req.headers.token = localStorage.getItem("token")!;
  }
  return req;
});

export const signUp = (formData: SingupProps) =>
  API.post("/user/signup", formData);

export const verifyCode = (formData: verifyCodeArgs) =>
  API.post("/user/verifyCode", formData);

// export const signIn = (formData) => API.post("/user/signin", formData);
