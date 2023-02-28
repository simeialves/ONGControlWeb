const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clienteRoutes");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/usuarioRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
// app.use(clientRoutes);
// app.use(loginRoutes);
// app.use(userRoutes);

app.get("/", (req, res) => {
  return res.status(200).json("Página Inicial");
});

//#region routes
app.use("/clientes", clientRoutes);
app.use("/auth", loginRoutes);
app.use("/user", userRoutes);
//#endregion

//#region Outros
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
//#endregion
