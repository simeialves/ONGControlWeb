import { api } from "../api";

export const getTipoColaboradores = async () => {
  return api.get("/tipocolaboradores");
};
