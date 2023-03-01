const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clienteRoutes");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/usuarioRoutes");
const pessoasRoutes = require("./routes/pessoaRoutes");
const tipoDoacaoRoutes = require("./routes/tipoDoacoesRoutes");
const tipoColaboradorRoutes = require("./routes/tipoColaboradoresRoutes");
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
app.use("/user", userRoutes);
app.use("/pessoas", pessoasRoutes);
app.use("/tipodoacoes", tipoDoacaoRoutes);
app.use("/tipocolaboradores", tipoColaboradorRoutes);
//#endregion

//#region Outros
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
//#endregion
