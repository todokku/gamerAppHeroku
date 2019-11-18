const User = require("../../model/user");

const checkGoogleAccount = (req, res, next) => {
  const { email } = req.body.user;
  User.findOne({ email: email }).then(user => {
    if (user == null) {
      next();
    } else {
      res.status(403).send({
        status: 1,
        error: `Email : ${email} déjà enregistré.`
      });
    }
  });
};

module.exports = { checkGoogleAccount };
