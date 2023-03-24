import { api } from "../api";

export const getDoacaoEventoPessoa = async (eventoid) => {
  const result = await api.get(`/doacaoeventopessoa/eventoid=${eventoid}`);
  return result;
};
