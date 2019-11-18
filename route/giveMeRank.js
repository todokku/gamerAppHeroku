const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/givemerank", verifyToken, (req, res) => {
    let { listGames } = req.body;
    User.find(
      { "games.name": { $in: listGames } },
      {
        _id: 0,
        password: 0,
        token: 0,
        sex: 0,
        age: 0,
        city: 0,
        country: 0,
        photo: 0,
        googlePhoto: 0,
        creation_date: 0,
        isEmailConfirmed: 0,
        isGoogleAccount: 0,
        isPremium: 0,
        "games._id": 0,
        __v: 0
      }
    ).then(user => res.status(200).send(user));
  });
};
