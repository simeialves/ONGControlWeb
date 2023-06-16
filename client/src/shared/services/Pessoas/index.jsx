import { api } from "../api";

export const getPessoas = async (nome) => {
  console.log(nome);
  return api.get(`/pessoas/?nome=${nome}`);
};

export const getPessoasById = async (id) => {
  return api.get(`/pessoas/${id}`);
};
