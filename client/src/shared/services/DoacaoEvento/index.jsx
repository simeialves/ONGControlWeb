import { api } from "../api";

export const getDoacaoEvento = async () => {
  const response = await api.get("/doacaoeventos");
  return response.data;
};
