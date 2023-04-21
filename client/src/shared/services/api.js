import axios from "axios";
import { removeCaracter } from "../../pages/Uteis/Uteis";

export const token = localStorage.getItem("access_token");

export const api = axios.create({
  baseURL: "http://52.2.207.251/",
  headers: { "x-access-token": token },
});

export const apiCEP = axios.create({
  baseURL: "https://viacep.com.br",
});

export const getCEP = async (cep) => {
  const cepFormat = removeCaracter(cep);
  return apiCEP.get(`/ws/${cepFormat}/json/`);
};

export const createSession = async (email, password) => {
  return api.post("/auth/loginAuth", { email, password });
};
