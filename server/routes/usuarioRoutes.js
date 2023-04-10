const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const UsuarioController = require("../Controllers/UsuarioController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/register", verifyJWT, UsuarioController.create);
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, UsuarioController.getAll);
appRoutes.get("/:id", verifyJWT, UsuarioController.getById);
appRoutes.get("/filter", verifyJWT, UsuarioController.getByFilter);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, UsuarioController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, UsuarioController.delete);
//#endregion

module.exports = appRoutes;
