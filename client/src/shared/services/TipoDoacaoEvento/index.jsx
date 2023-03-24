import { api } from "../api";

export const getTipoDoacaoEventos = async (eventoid) => {
  console.log(eventoid);
  return api.get(`/tipodoacaoeventos/?eventoid=${eventoid}`);
};
