const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const DoacaoEventoController = require("../controllers/DoacaoEventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, DoacaoEventoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, DoacaoEventoController.getAll);
appRoutes.get("/:id", verifyJWT, DoacaoEventoController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, DoacaoEventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, DoacaoEventoController.delete);
//#endregion

module.exports = appRoutes;
