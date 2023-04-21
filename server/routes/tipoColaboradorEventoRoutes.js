const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const TipoColaboradorEventoController = require("../controllers/TipoColaboradorEventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, TipoColaboradorEventoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, TipoColaboradorEventoController.getAll);
appRoutes.get("/:id", verifyJWT, TipoColaboradorEventoController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, TipoColaboradorEventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, TipoColaboradorEventoController.delete);
//#endregion

module.exports = appRoutes;
