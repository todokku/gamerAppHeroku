const { clientId } = require("../../config/security");
const { androidClientId } = require("../../config/security");
const verifier = require("google-id-token-verifier");

const verifyGoogleToken = (req, res, next) => {
  const { token, androidUser } = req.body;
  verifier.verify(
    token,
    androidUser ? androidClientId : clientId,
    (err, tokenInfo) => {
      if (err) {
        res.status(403).send({ status: 2, error: "Token invalid" });
      } else if (tokenInfo.email_verified) {
        next();
      }
    }
  );
};

module.exports = { verifyGoogleToken };
