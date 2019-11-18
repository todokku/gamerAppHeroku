const User = require("../../model/user");

const checkGoogleLoginAccount = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email, isGoogleAccount: true }).then(user => {
    if (user) {
      res
        .status(403)
        .send({
          status: 4,
          error:
            "Compte Google. Cliquez sur le button Google au-dessous pour vous loger."
        });
    } else {
      next();
    }
  });
};

module.exports = { checkGoogleLoginAccount };
