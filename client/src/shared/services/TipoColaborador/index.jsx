import { api } from "../api";

export const getTipoColaboradores = async (descricao, ativo) => {
  return api.get(`/tipocolaboradores/?descricao=${descricao}&&ativo=${ativo}`);
};
