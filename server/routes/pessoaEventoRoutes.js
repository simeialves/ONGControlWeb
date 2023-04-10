const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const PessoaEventoController = require("../Controllers/PessoaEventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, PessoaEventoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, PessoaEventoController.getAll);
appRoutes.get("/:id", verifyJWT, PessoaEventoController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, PessoaEventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, PessoaEventoController.delete);
//#endregion

module.exports = appRoutes;
