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

/*Gerador de data e hora atual*/
export function getDateHourNow() {
  const dateNow = new Date();
  return removeCaracter(formatDateNoTime(dateNow));
}

export function generateRandomRGBAColorSequence(length) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    let r, g, b;
    do {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 51); // Gera valor entre 0 e 50 para tons de vermelho
      b = Math.floor(Math.random() * 51); // Gera valor entre 0 e 50 para tons de vermelho
    } while (isColorTooLight(r, g, b));

    const s = "0.8";
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${s})`;
    colors.push(rgbaColor);
  }
  return colors;
}

const isColorTooLight = (r, g, b) => {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85;
};
