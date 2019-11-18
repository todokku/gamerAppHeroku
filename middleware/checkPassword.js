const User = require("../model/user");
const bcryptjs = require("bcryptjs");

const checkPassword = (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user == null) {
      res.status(404).send({ status: 1, error: "Utilisateur non trouvé" });
    } else if (!user.isEmailConfirmed) {
      res
        .status(403)
        .send({ status: 2, error: "Votre email n'a pas été confirmé" });
    } else {
      bcryptjs.compare(password, user.password, (err, comparison) => {
        if (comparison) {
          next();
        } else {
          res.status(401).send({ status: 3, error: "Mot de passe incorrect" });
        }
      });
    }
  });
};

module.exports = { checkPassword };
