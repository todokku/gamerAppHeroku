const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/deleteaccount", verifyToken, (req, res) => {
    const { email } = req.body;
    User.findOneAndRemove({ email: email }).then(() => {
      User.findOne({ email: email }).then(user => {
        if (user === null) {
          res.status(200).send({ success: "Votre compte a été supprimé." });
        }
      });
    });
  });
};
