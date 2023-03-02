const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clienteRoutes");
const loginRoutes = require("./routes/loginRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const pessoasRoutes = require("./routes/pessoaRoutes");
const tipoDoacaoRoutes = require("./routes/tipoDoacaoRoutes");
const tipoColaboradorRoutes = require("./routes/tipoColaboradoresRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const localeventoRoutes = require("./routes/localEventoRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json("Página Inicial");
});

//#region routes
app.use("/clientes", clientRoutes);
app.use("/auth", loginRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/pessoas", pessoasRoutes);
app.use("/tipodoacoes", tipoDoacaoRoutes);
app.use("/tipocolaboradores", tipoColaboradorRoutes);
app.use("/eventos", eventoRoutes);
app.use("/localeventos", localeventoRoutes);
//#endregion

//#region Outros
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
//#endregion
