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

export const getUsuarios = async () => {
  return api.get("/usuarios");
};

export const getPessoas = async () => {
  return api.get("/pessoas");
};

export const getTipoDoacoes = async () => {
  return api.get("/tipodoacoes");
};

export const getTipoColaboradores = async () => {
  return api.get("/tipocolaboradores");
};

export const getEventos = async () => {
  return api.get("/eventos");
};

export const getLocalEventos = async () => {
  return api.get("/localeventos");
};

export const getClienteByNome = async (nome) => {
  return api.get(`/clientes/${nome}`);
};

export const getPacoteLogByPacoteId = async (id) => {
  return api.get(`/controlequalidade/${id}`);
};

export const newUser = async (nome, documento) => {
  return api.post("/user/register", {});
};

// export const newPessoa = async (nome, documento) => {
//   return api.post("/pessoas/newPessoa", {});
// };
