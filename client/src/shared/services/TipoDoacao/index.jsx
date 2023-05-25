import { api } from "../api";

export const getTipoDoacoesById = async (id) => {
  return api.get(`/tipodoacoes/${id}`);
};
