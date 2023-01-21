const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }

  const matches = authorization.match(/(bearer)\s+(\S+)/i);

  return matches && matches[2];
};

const checkTokenMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!token) {
    return res
      .status(401)
      .json({
        message:
          "You need to have authorization to accesse this route please, log you !",
      });
  }

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Bad token" });
    }
    decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    TokenUserDecrypt = {
      id_user: `${decodedToken.id_user}`,
      fk_role: `${decodedToken.fk_role}`,
    };
    next();
  });
};

module.exports = checkTokenMiddleware;
