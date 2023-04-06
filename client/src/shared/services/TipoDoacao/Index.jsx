import { api } from "../api";

export const getTipoDoacoes = async (ativo) => {
  return api.get(`/tipodoacoes/?ativo=${ativo}`);
};
