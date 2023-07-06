const express = require("express");
const cors = require("cors");
const db = require("../config/db");
const PessoaController = require("../controllers/PessoaController");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyJWT } = require("./../includes/Uteis");

const corsOptions = {
  origin: "*",
  exposedHeaders: "X-Total-Count",
};
appRoutes.use(cors(corsOptions));
appRoutes.use(bodyParser.json());

//#region CREATE
appRoutes.post("/", verifyJWT, PessoaController.create);
//#endregion

//#region READ
/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Retorna todas as pessoas.
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de todas as pessoas.
 *       400:
 *         description: Erro na requisição.
 *       401:
 *          description: Necessário um token de autenticação.
 */
appRoutes.get("/", verifyJWT, PessoaController.getAll);
appRoutes.get("/:id", verifyJWT, PessoaController.getById);
//#endregion

//#region UPDATE
appRoutes.put("/:id", verifyJWT, PessoaController.update);
//#endregion

//#region DELETE
// appRoutes.delete("/deleteall", PessoaController.deleteAll);
appRoutes.delete("/:id", verifyJWT, PessoaController.delete);
//#endregion

module.exports = appRoutes;
