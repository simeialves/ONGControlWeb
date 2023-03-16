import axios from "axios";
import { removeCaracter } from "../../pages/Uteis/Uteis";

export const token = localStorage.getItem("access_token");

export const api = axios.create({
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

export const getUsuarios = async () => {
  return api.get("/usuarios");
};

export const getPessoas = async () => {
  return api.get("/pessoas");
};

export const getTipoDoacoes = async () => {
  return api.get("/tipodoacoes");
};

export const getTipoColaboradores = async () => {
  return api.get("/tipocolaboradores");
};

export const getEventos = async () => {
  return api.get("/eventos");
};

export const getEventosAtivos = async () => {
  return api.post(`/eventos/ativo`);
};

export const getLocalEventos = async () => {
  return api.get("/localeventos");
};

export const getClienteByNome = async (nome) => {
  return api.get(`/clientes/${nome}`);
};

export const getPacoteLogByPacoteId = async (id) => {
  return api.get(`/controlequalidade/${id}`);
};

export const newUser = async (nome, documento) => {
  return api.post("/user/register", {});
};
