import { api } from "../api";

export const getPessoas = async () => {
  return api.get("/pessoas");
};

export const getPessoasById = async (id) => {
  return api.get(`/pessoas/${id}`);
};
