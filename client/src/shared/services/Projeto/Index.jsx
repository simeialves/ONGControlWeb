import { api } from "../api";

export const getProjetos = async () => {
  return api.get("/projetos");
};
