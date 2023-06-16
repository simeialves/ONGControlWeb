import { api } from "../api";

export const getTipoDoacoes = async (descricao, ativo) => {
  return api.get(`/tipodoacoes/?descricao=${descricao}&&ativo=${ativo}`);
};

export const getTipoDoacoesById = async (id) => {
  return api.get(`/tipodoacoes/${id}`);
};
