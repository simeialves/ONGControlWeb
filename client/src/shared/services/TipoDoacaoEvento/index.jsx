import { api } from "../api";

export const getTipoDoacaoEventos = async () => {
  return api.get("/tipodoacaoeventos");
};
