import { api } from "../api";

export const getTipoDoacaoEventos = async (eventoid) => {
  const result = await api.get(`/tipodoacaoeventos/?eventoid=${eventoid}`);
  return result;
};
