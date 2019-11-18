const User = require("../model/user");
const { checkAdmin } = require("../middleware/checkAdmin");

module.exports = app => {
  app.post("/deletenotconfirmed", checkAdmin, (req, res) => {
    let { listPlayers } = req.body;
    User.deleteMany({ email: { $in: listPlayers } }).then(() => {
      User.find({
        isEmailConfirmed: false,
        creation_date: {
          $lte: new Date().getTime() - 1000 * 3600 * 24 * 2
        }
      }).then(user => {
        res.status(200).send(user);
      });
    });
  });
};
