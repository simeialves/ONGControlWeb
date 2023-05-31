export function formatDate(dataInput) {
  return new Date(dataInput).toLocaleString().replace(", 00:00:00", "");
}

export function formatDateNoTime(dateInput) {
  let data = new Date(dateInput),
    dia = data.getDate().toString(),
    diaF = dia.length === 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length === 1 ? "0" + mes : mes,
    anoF = data.getFullYear();

  return anoF + "-" + mesF + "-" + diaF;
}

export function removeCaracter(valor) {
  return valor.replace(/\D/g, "");
}

/*Retirar aspas de uma determinada string*/
export function removeAspas(valor) {
  return valor.replace(/["]/g, "");
}

/*Gerador de Senha de Retirada de Doações*/
export function geradorSenhaRetirada(valor) {
  const dateNow = new Date();
  return removeCaracter(formatDateNoTime(dateNow)) + "-" + valor;
}
