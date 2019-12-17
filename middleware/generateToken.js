const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { jwtSecret } = require("../config/security");

const generateToken = (req, res, next) => {
  let { email } = req.body;
  User.findOne({ email: email }).then(user => {
    let userId = user._id;
    let token = jwt.sign({ userId }, jwtSecret);
    User.findOneAndUpdate(
      { email: email },
      { $set: { token: token } },
      { new: true }
    )
      .exec()
      .then(result => {
        if (result) {
          req.body.token = result.token;
          next();
        }
      })
      .catch(err => console.log(err));
  });
};

module.exports = { generateToken };
