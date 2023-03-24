import { api } from "../api";

export const getPessoasEvento = async (tipo, eventoid) => {
  const result = await api.get(
    `/pessoaseventos/?tipo=${tipo}&eventoid=${eventoid}`
  );
  return result;
};
