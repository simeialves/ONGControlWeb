import axios from "axios";

export const token = localStorage.getItem("access_token");

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "x-access-token": token },
});
