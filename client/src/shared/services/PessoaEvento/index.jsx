import { api } from "../api";

export const getPessoasEvento = async (tipo, eventoid, nome) => {
  const result = await api.get(
    `/pessoaseventos/?tipo=${tipo}&eventoid=${eventoid}&nome=${nome}`
  );
  return result;
};
