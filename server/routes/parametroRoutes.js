const express = require("express");
const db = require("../config/db");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const { NOT_FOUND, SUCCESS_UPDATED } = require("../includes/Messages");
const ParametroController = require("../Controllers/ParametroController");

appRoutes.use(bodyParser.json());

//#region READ
appRoutes.get("/", verifyJWT, ParametroController.getAll);
//#endregion

//#region UPDATE
appRoutes.put("/", verifyJWT, ParametroController.update);
//#endregion
module.exports = appRoutes;
