import { api } from "../api";

export const getTipoDoacaoEventos = async (eventoid) => {
  const result = await api.get(`/tipodoacaoeventos/?eventoid=${eventoid}`);
  return result;
};

export const getTipoDoacaoEventosById = async (id) => {
  const result = await api.get(`/tipodoacaoeventos/${id}`);
  return result;
};
