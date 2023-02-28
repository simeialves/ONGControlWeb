const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const controlqualidadeRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

controlqualidadeRoutes.use(bodyParser.json());

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

//READ
controlqualidadeRoutes.post("/", verifyJWT, async (req, res, next) => {
  //const { dataInicial, dataFinal } = req.body;

  const dataInicial = "2022-12-13 00:00:00";
  const dataFinal = "2022-12-15 00:00:00";

  console.log(req.body);
  console.log(dataInicial, dataFinal);

  await db.knex
    .raw(
      "select distinct " +
        "(select descricao from ftp ff join clienteftp cc on ff.ftpid = cc.ftpid where cc.clienteid = c.clienteid and ff.tipo = 1 group by descricao) as clienteftp_nuvem, " +
        "(select descricao from ftp ff join clienteftp cc on ff.ftpid = cc.ftpid where cc.clienteid = c.clienteid and ff.tipo = 2 group by descricao) as clienteftp_lyon,  " +
        "pacote.pacoteid, pacote.bancoid, pacote.arquivo, pacote.tamanhokb, pacote.data, pacote.tamanhobancokb, pacote.espacolivregb,  pacote.tipo, pacote.nivel, pacote.agendamentoid, " +
        "b.clienteid, c.nome, b.sistema, b.plano, b.observacao, substring(b.caminhonuvem, 1,2) as disconuvem, substring(b.caminholyon, 1,2) as discolyon, " +
        "(select status from pacotelog pl1 where pacotelogid = (select max(pl2.pacotelogid) from pacotelog pl2 where pl2.pacoteid = pacote.pacoteid)) as status, " +
        "(select descricao from pacotelog pl1 where pacotelogid = (select max(pl2.pacotelogid) from pacotelog pl2 where pl2.pacoteid = pacote.pacoteid)) as descricao " +
        "from pacote join (select max(pacote.pacoteid) pacoteid, pacote.bancoid from pacote where 1 = 1 and data between ? and ? group by pacote.bancoid, pacote.tipo) a on a.pacoteid = pacote.pacoteid " +
        "join banco b on pacote.bancoid = b.bancoid " +
        "join cliente c on b.clienteid = c.clienteid " +
        "where ((select status from pacotelog where (a.pacoteid=pacotelog.pacoteid) order by pacotelogid desc limit 1) not in ('19', '33', '43')) " +
        "order by pacote.pacoteid desc;",
      [dataInicial, dataFinal]
    )
    .then(function (result) {
      return res.status(201).json(result[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

controlqualidadeRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Erro ao buscar pacote - " + err.message });
  } else {
    const result = await db.knex("pacotelog").where("pacotelog.pacoteid", id);
    if (result) {
      return res.status(200).json(result);
      console.log(result);
    } else {
      return res.status(404).json({ message: "Pacote não encontrado" });
    }
  }
});

module.exports = controlqualidadeRoutes;
