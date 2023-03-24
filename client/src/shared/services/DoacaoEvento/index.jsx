import { api } from "../api";

export const getDoacaoEvento = async (eventoid) => {
  const result = await api.get(`/doacaoeventos/?eventoid=${eventoid}`);
  return result;
};
