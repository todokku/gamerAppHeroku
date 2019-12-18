const { checkPassword } = require("../middleware/checkPassword");
const { protectAgainstHack } = require("../middleware/protectAgainstHack");
const {
  checkGoogleLoginAccount
} = require("../middleware/google/checkGoogleLoginAccount");
const { generateToken } = require("../middleware/generateToken");
const User = require("../model/user");

module.exports = app => {
  app.post(
    "/login",
    [protectAgainstHack, checkGoogleLoginAccount, checkPassword, generateToken],
    (req, res) => {
      if (res.statusCode == 200) {
        let { email, token } = req.body;
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
      }
    }
  );
};
