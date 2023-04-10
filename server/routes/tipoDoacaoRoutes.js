const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const TipoDoacaoController = require("../Controllers/TipoDoacaoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, TipoDoacaoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, TipoDoacaoController.getAll);
appRoutes.get("/:id", verifyJWT, TipoDoacaoController.getById);
appRoutes.get("/filter", verifyJWT, TipoDoacaoController.getByFilter);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, TipoDoacaoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, TipoDoacaoController.delete);
//#endregion

module.exports = appRoutes;
