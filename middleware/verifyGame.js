const User = require("../model/user");

const verifyGame = (req, res, next) => {
  const { email } = req.body;
  const { name } = req.body.game;
  User.findOne({ email: email, "games.name": name }).then(result => {
    if (result) {
      res.status(401).send({ status: 1 });
    } else {
      next();
    }
  });
};

module.exports = { verifyGame };
