const User = require("../model/user");

const verifyGameMission = (req, res, next) => {
  const { email, game, mission } = req.body;
  User.findOne(
    {
      email: email
    },
    { games: { $elemMatch: { name: game } } }
  ).then(user => {
    if (mission > user.games[0].total_missions) {
      res.status(404).send({ status: 1 });
    } else {
      next();
    }
  });
};

module.exports = { verifyGameMission };
