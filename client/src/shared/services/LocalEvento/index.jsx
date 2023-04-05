import { api } from "../api";

export const getLocalEventos = async () => {
  return await api.get("/localeventos");
};
