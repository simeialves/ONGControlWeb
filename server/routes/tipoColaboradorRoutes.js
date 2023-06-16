const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("../includes/Uteis");
const TipoColaboradorController = require("../controllers/TipoColaboradorController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, TipoColaboradorController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, TipoColaboradorController.getAll);
appRoutes.get("/:id", verifyJWT, TipoColaboradorController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, TipoColaboradorController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, TipoColaboradorController.delete);
//#endregion

module.exports = appRoutes;
