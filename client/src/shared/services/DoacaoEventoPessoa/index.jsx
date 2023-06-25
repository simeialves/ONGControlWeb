import { api } from "../api";

export const getDoacaoEventoPessoa = async (eventoid) => {
  const result = await api.get(`/doacaoeventospessoas/?eventoid=${eventoid}`);
  return result;
};

export const getDoacaoEventoPessoaByPessoaEventoId = async (pessoaEventoId) => {
  const result = await api.get(
    `/doacaoeventospessoas/?pessoaEventoId=${pessoaEventoId}`
  );
  return result;
};
