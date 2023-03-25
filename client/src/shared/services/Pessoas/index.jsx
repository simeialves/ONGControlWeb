import { api } from "../api";

export const getPessoas = async () => {
  return api.get("/pessoas");
};
