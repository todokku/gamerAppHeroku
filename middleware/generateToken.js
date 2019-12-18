const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { jwtSecret } = require("../config/security");

const generateToken = (req, res, next) => {
  let { email } = req.body;
  User.findOne({ email: email }).then(user => {
    let userId = user._id;
    let token = jwt.sign({ userId }, jwtSecret);
    req.body.token = token;
    next();
  });
};

module.exports = { generateToken };
