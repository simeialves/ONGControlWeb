const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const LoginController = require("../Controllers/LoginController");

appRoutes.use(bodyParser.json());

//#region Auth
appRoutes.post("/loginAuth", LoginController.login);
//#endregion

module.exports = appRoutes;
