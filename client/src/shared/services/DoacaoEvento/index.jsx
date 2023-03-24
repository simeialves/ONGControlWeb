import { api } from "../api";

export const getDoacaoEvento = async (eventoid) => {
  const result = await api.get(`/doacaoevento/eventoid=${eventoid}`);
  return result;
};
