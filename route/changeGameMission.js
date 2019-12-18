const User = require("../model/user");
const { verifyGameMission } = require("../middleware/verifyGameMission");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/changemission", [verifyToken, verifyGameMission], (req, res) => {
    const { email, game, mission, token } = req.body;
    User.findOneAndUpdate(
      { email: email, "games.name": game },
      { $set: { "games.$.current_mission": mission } },
      {
        projection: {
          _id: 0,
          password: 0,
          "games._id": 0,
          __v: 0
        },
        new: true
      }
    )
      .exec()
      .then(result => {
        if (result)
          User.findOneAndUpdate(
            { email: email, "games.name": game },
            {
              $push: {
                "games.$.updates": { new_mission: mission, date: new Date() }
              }
            },
            {
              projection: {
                _id: 0,
                password: 0,
                "games._id": 0,
                __v: 0
              },
              new: true
            }
          )
            .exec()
            .then(user => {
              user.token = token;
              if (user) res.status(200).send({ success: user });
            });
      });
  });
};
