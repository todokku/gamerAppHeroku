const { checkPassword } = require("../middleware/checkPassword");
const User = require("../model/user");

module.exports = app => {
  app.post("/loginadmin", checkPassword, (req, res) => {
    if (res.statusCode == 200) {
      let { email } = req.body;
      User.findOne(
        { email: email },
        {
          _id: 0,
          password: 0,
          __v: 0
        }
      ).then(user => {
        res.status(200).send(user);
      });
    }
  });
};
