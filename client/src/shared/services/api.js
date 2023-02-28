import axios from "axios";

const token = localStorage.getItem("access_token");

export const api = axios.create({
  //baseURL: "http://186.248.86.194:4444",
  baseURL: "http://localhost:5000",
  headers: { "x-access-token": token },
});

export const createSession = async (email, password) => {
  return api.post("/auth/loginAuth", { email, password });
};

export const getUsers = async () => {
  return api.get("/clientes");
};

export const getClienteByNome = async (nome) => {
  return api.get(`/clientes/${nome}`);
};

export const getPacotes = async (dataInicial, dataFinal) => {
  return api.post(`/controlequalidade/`, { dataInicial, dataFinal });
};

export const getPacoteLogByPacoteId = async (id) => {
  return api.get(`/controlequalidade/${id}`);
};

export const newUser = async (nome, documento) => {
  return api.post("/user/register", {});
};
