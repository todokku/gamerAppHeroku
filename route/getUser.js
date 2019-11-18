const User = require("../model/user");

module.exports = app => {
  app.post("/getUser", (req, res) => {
    const { isGoogleAccount, email, token } = req.body;
    User.findOne(isGoogleAccount ? { email: email } : { token: token }, {
      _id: 0,
      password: 0,
      "games._id": 0,
      __v: 0
    }).then(user => {
      res.status(200).send(user);
    });
  });
};
