const express = require("express");
const cors = require("cors");
const db = require("../config/db");
const PessoaController = require("../controllers/PessoaController");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");

const corsOptions = {
  origin: "*",
  exposedHeaders: "X-Total-Count",
};
appRoutes.use(cors(corsOptions));
appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, PessoaController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, PessoaController.getAll);
appRoutes.get("/filter", verifyJWT, PessoaController.getByFilter);
appRoutes.get("/:id", verifyJWT, PessoaController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, PessoaController.update);
//#endregion

//#region DELETE
// appRoutes.delete("/deleteall", PessoaController.deleteAll);
appRoutes.delete("/:id", verifyJWT, PessoaController.delete);
//#endregion

module.exports = appRoutes;
