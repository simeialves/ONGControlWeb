import { api } from "../api";

export const getEventos = async () => {
  return api.get("/eventos");
};
