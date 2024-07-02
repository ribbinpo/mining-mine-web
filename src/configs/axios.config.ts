import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  // headers: { "X-Custom-Header": "foobar" },
});
