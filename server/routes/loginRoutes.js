const express = require("express");
const db = require("../config/db");
const appRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const {
  SUCCESS_LOGGED,
  INCORRECT_CREDENTIALS,
  ERROR_VERIFYING_CREDENTIALS,
} = require("../includes/Messages");

require("dotenv").config();
appRoutes.use(bodyParser.json());

//#region Auth
appRoutes.post("/loginAuth", (req, res) => {
  db.knex
    .select("*")
    .from("usuario")
    .where({ login: req.body.email })
    .then(async (results) => {
      if (results.length) {
        let usuario = results[0];
        let checkSenha = await bcrypt.compare(req.body.password, usuario.senha);
        if (checkSenha) {
          var tokenJWT = jwt.sign(
            { id: usuario.usuarioid },
            process.env.SECRET_KEY,
            {
              expiresIn: 86400,
            }
          );
          res.status(200).json({
            success: true,
            message: SUCCESS_LOGGED,
            id: usuario.usuarioid,
            email: usuario.login,
            access_token: tokenJWT,
          });
          return;
        } else
          res.status(401).json({
            success: false,
            message: INCORRECT_CREDENTIALS,
          });
      } else
        res.status(401).json({
          success: false,
          message: INCORRECT_CREDENTIALS,
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_VERIFYING_CREDENTIALS + " - " + err.message,
      });
    });
});
//#endregion

module.exports = appRoutes;
