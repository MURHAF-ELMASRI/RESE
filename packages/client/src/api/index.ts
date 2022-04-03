import { SingupProps } from "@rese/client-server/api/signup";
import axios from "axios";
import getServerUrl from "./getServerUrl";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token") && req.headers) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const signUp = (formData: SingupProps) =>
  API.post("/user/signup", formData);

// export const signIn = (formData) => API.post("/user/signin", formData);
