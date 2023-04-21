const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const ProjetoController = require("../controllers/ProjetoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, ProjetoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, ProjetoController.getAll);
appRoutes.get("/:id", verifyJWT, ProjetoController.getById);
appRoutes.get("/filter", verifyJWT, ProjetoController.getByFilter);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, ProjetoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, ProjetoController.delete);
//#endregion

module.exports = appRoutes;
