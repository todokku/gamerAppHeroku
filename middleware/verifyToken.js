const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/security");

const verifyToken = (req, res, next) => {
  let token = req.get("x-auth");
  let tokenParam = req.params.token;
  const { isGoogleAccount } = req.body;

  if (isGoogleAccount && token === undefined && tokenParam === undefined) {
    next();
  } else {
    jwt.verify(token ? token : tokenParam, jwtSecret, (err, decoded) => {
      if (err) res.status(401).send("You have no authorization");
      if (decoded) {
        next();
      }
    });
  }
};

module.exports = { verifyToken };
