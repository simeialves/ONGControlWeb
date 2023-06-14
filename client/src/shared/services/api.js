import axios from "axios";
import { removeCaracter } from "../../pages/Uteis/Uteis";

export const token = localStorage.getItem("access_token");

export const api = axios.create({
  //baseURL: "http://54.163.168.191/",
  baseURL: "http://localhost:5000",
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

export const getTipoDoacoes = async (ativo) => {
  return api.get(`/tipodoacoes/?ativo=${ativo}`);
};
