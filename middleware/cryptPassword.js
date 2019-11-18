const bcrypt = require("bcryptjs");

const cryptUserPassword = (req, res, next) => {
  let userPassword = req.body.user.password.toString();
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(userPassword, salt, (err, hash) => {
      req.body.user.password = hash;
      next();
    });
  });
};

module.exports = { cryptUserPassword };
