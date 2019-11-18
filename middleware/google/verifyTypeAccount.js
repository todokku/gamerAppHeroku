const User = require("../../model/user");

const verifyTypeAccount = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email, isGoogleAccount: true }).then(user => {
    if (user) {
      res.status(403).send({ status: 3 });
    } else {
      next();
    }
  });
};

module.exports = { verifyTypeAccount };
