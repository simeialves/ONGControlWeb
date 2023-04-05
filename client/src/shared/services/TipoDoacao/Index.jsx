import { api } from "../api";

export const getTipoDoacoes = async () => {
  return api.get("/tipodoacoes");
};
