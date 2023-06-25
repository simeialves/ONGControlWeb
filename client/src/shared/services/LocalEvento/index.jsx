import { api } from "../api";

export const getLocalEventos = async (nome) => {
  return await api.get(`/localeventos/?nome=${nome}`);
};

export const getProjetos = async () => {
  return api.get("/projetos");
};
