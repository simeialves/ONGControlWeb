require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { NO_TOKEN_PROVIDER, FAILED_AUTH_TOKEN } = require("./Messages");

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: NO_TOKEN_PROVIDER });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: FAILED_AUTH_TOKEN });

    req.userId = decoded.id;
    next();
  });
}

async function GerarHeaders() {
  const url = `${process.env.URL_BASE}/auth/loginAuth`;
  const data = {
    email: process.env.SYS_EMAIL,
    password: process.env.SYS_PASS,
  };

  const token = await axios
    .post(url, data)
    .then((response) => {
      return response.data.access_token;
    })
    .catch((error) => {
      console.error(error);
    });

  const headers = {
    "x-access-token": token,
  };
  return headers;
}

module.exports = {
  verifyJWT,
  GerarHeaders,
};
