const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");
const EventoController = require("../controllers/EventoController");

appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, EventoController.create);
//#endregion

//#region READ
/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Retorna todas os eventos.
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de todos os eventos.
 *       400:
 *         description: Erro na requisição.
 */
appRoutes.get("/", verifyJWT, EventoController.getAll);
appRoutes.get("/:id", verifyJWT, EventoController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, EventoController.update);
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, EventoController.delete);
//#endregion

module.exports = appRoutes;
