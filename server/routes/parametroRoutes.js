const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const ParametroController = require("../controllers/ParametroController");

appRoutes.use(bodyParser.json());

//#region READ
appRoutes.get("/", verifyJWT, ParametroController.getAll);
//#endregion

//#region UPDATE
appRoutes.put("/", verifyJWT, ParametroController.update);
//#endregion
module.exports = appRoutes;
