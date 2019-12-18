const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyGame } = require("../middleware/verifyGame");

module.exports = app => {
  app.post("/insertgame", [verifyGame, verifyToken], (req, res) => {
    req.body.game.date = new Date();
    const { email, game, token } = req.body;
    User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          games: game
        }
      },
      { projection: { _id: 0, password: 0, "games._id": 0, __v: 0 }, new: true }
    )
      .exec()
      .then(user => {
        if (user) {
          User.findOneAndUpdate(
            { email: email, "games.name": game.name },
            {
              $push: {
                "games.$.updates": {
                  new_mission: game.current_mission,
                  date: new Date()
                }
              }
            },
            {
              projection: { _id: 0, password: 0, "games._id": 0, __v: 0 },
              new: true
            }
          )
            .exec()
            .then(user => {
              user.token = token;
              if (user) res.status(200).send({ success: user });
            });
        }
      });
  });
};
