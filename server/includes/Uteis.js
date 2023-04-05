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

module.exports = {
  verifyJWT,
};
