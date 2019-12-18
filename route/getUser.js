const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/getUser", verifyToken, (req, res) => {
    const { email, token } = req.body;
    User.findOne(
      { email: email },
      {
        _id: 0,
        password: 0,
        "games._id": 0,
        __v: 0
      }
    ).then(user => {
      user.token = token;
      res.status(200).send(user);
    });
  });
};
