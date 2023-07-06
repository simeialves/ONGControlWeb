import { api } from "../api";

export const getTipoColaboradorEventos = async (eventoid) => {
  const result = await api.get(`/tipocolaboradoreventos/?eventoid=${eventoid}`);
  return result;
};

export const getTipoColaboradorEventosById = async (id) => {
  const result = await api.get(`/tipocolaboradoreventos/${id}`);
  return result;
};
