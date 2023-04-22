const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const loginRoutes = require("./routes/loginRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const pessoaRoutes = require("./routes/pessoaRoutes");
const pessoaEventoRoutes = require("./routes/pessoaEventoRoutes");

const tipoDoacaoRoutes = require("./routes/tipoDoacaoRoutes");
const tipoDoacaoEventoRoutes = require("./routes/tipoDoacaoEventoRoutes");

const tipoColaboradorRoutes = require("./routes/tipoColaboradorRoutes");
const tipoColaboradorEventoRoutes = require("./routes/tipoColaboradorEventoRoutes");

const eventoRoutes = require("./routes/eventoRoutes");

const doacaoEventoRoutes = require("./routes/doacaoEventoRoutes");

const localeventoRoutes = require("./routes/localEventoRoutes");
const parametrosRoutes = require("./routes/parametroRoutes");
const projetoRoutes = require("./routes/projetoRoutes");
const app = express();

const envpath =
  process.env.NODE_ENV === undefined
    ? ".env.development"
    : `.env.${process.env.NODE_ENV}`;

require("dotenv").config({
  path: envpath,
});

app.use(morgan("common"));

const corsOptions = {
  origin: "*",
  exposedHeaders: "X-Total-Count",
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json("Página Inicial do ONGControlWeb - 16");
});

//#region routes
app.use("/auth", loginRoutes);
app.use("/usuarios", usuarioRoutes);

app.use("/pessoas", pessoaRoutes);
app.use("/pessoaseventos", pessoaEventoRoutes);

app.use("/tipodoacoes", tipoDoacaoRoutes);
app.use("/tipodoacaoeventos", tipoDoacaoEventoRoutes);

app.use("/tipocolaboradores", tipoColaboradorRoutes);
app.use("/tipocolaboradoreventos", tipoColaboradorEventoRoutes);

app.use("/eventos", eventoRoutes);

app.use("/doacaoeventos", doacaoEventoRoutes);

app.use("/localeventos", localeventoRoutes);
app.use("/parametros", parametrosRoutes);
app.use("/projetos", projetoRoutes);
//#endregion

//#region Outros
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
//#endregion

module.exports = app;
