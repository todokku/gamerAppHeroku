const User = require("../model/user");

const checkLoginDb = (req, res, next) => {
  let { email } = req.body.user;
  User.findOne({ email: email }).then(email => {
    if (email == null) {
      next();
    } else {
      res.status(403).send({ status: 5, error: "Email choisi est déjà pris" });
    }
  });
};

module.exports = { checkLoginDb };
