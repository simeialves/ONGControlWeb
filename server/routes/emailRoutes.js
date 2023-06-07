const express = require("express");
const cors = require("cors");
const db = require("../config/db");
const EmailController = require("../controllers/EmailController");
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
appRoutes.post("/enviar-email", verifyJWT, EmailController.enviarEmail);
//#endregion

module.exports = appRoutes;
