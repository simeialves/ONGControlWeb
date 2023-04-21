const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const LocalEventoController = require("../controllers/LocalEventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, LocalEventoController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, LocalEventoController.getAll);
appRoutes.get("/:id", verifyJWT, LocalEventoController.getById);
appRoutes.get("/filter", verifyJWT, LocalEventoController.getByFilter);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, LocalEventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, LocalEventoController.delete);
//#endregion

module.exports = appRoutes;
