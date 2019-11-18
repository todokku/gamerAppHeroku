const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/deletegame", verifyToken, (req, res) => {
    const { email, game } = req.body;
    User.findOneAndUpdate(
      { email: email },
      { $pull: { games: { name: game } } },
      { projection: { _id: 0, password: 0, "games._id": 0, __v: 0 }, new: true }
    )
      .exec()
      .then(user => {
        if (user) {
          res.status(200).send(user);
        }
      });
  });
};
