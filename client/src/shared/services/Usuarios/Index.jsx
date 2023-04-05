import { api } from "../api";

export const getUsuarios = async () => {
  return api.get("/usuarios");
};

export const newUser = async (nome, documento) => {
  return api.post("/user/register", {});
};
