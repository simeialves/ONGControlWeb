const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const TipoDoacaoEventoController = require("../Controllers/TipoDoacaoEventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, TipoDoacaoEventoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, TipoDoacaoEventoController.getAll);
appRoutes.get("/:id", verifyJWT, TipoDoacaoEventoController.getById);
appRoutes.get("/filter", verifyJWT, TipoDoacaoEventoController.getByFilter);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, TipoDoacaoEventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, TipoDoacaoEventoController.delete);
//#endregion

module.exports = appRoutes;
