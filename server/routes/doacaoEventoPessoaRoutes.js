const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("../includes/Uteis");
const DoacaoEventoPessoaController = require("../controllers/DoacaoEventoPessoaController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, DoacaoEventoPessoaController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, DoacaoEventoPessoaController.getAll);
appRoutes.get("/:id", verifyJWT, DoacaoEventoPessoaController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, DoacaoEventoPessoaController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, DoacaoEventoPessoaController.delete);
//#endregion

module.exports = appRoutes;
