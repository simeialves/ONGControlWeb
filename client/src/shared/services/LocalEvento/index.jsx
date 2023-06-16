import { api } from "../api";

export const getLocalEventos = async (nome) => {
  return await api.get(`/localeventos/?nome=${nome}`);
};
