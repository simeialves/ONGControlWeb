import { api } from "../api";

export const getEventos = async (descricao, ativo) => {
  return api.get(`/eventos/?descricao=${descricao}&&ativo=${ativo}`);
};
