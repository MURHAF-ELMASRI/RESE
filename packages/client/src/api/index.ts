import { SingupProps } from "@rese/client-server/api/signup";
import axios from "axios";
import getServerUrl from "./getServerUrl";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile") && req.headers) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") as string).token
    }`;
  }

  return req;
});

export const signUp = (formData: SingupProps) =>
  API.post(`${getServerUrl()}/user/signup`, formData);

// export const signIn = (formData) => API.post("/user/signin", formData);
