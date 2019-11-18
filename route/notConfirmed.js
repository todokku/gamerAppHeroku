const { checkAdmin } = require("../middleware/checkAdmin");
const User = require("../model/user");

module.exports = app => {
  app.post("/notconfirmed", checkAdmin, (req, res) => {
    User.find(
      {
        isEmailConfirmed: false,
        creation_date: {
          $lte: new Date().getTime() - 1000 * 3600 * 24 * 2
        }
      },
      {
        _id: 0,
        password: 0,
        __v: 0,
        token: 0,
        sex: 0,
        age: 0,
        city: 0,
        country: 0,
        photo: 0,
        googlePhoto: 0,
        isEmailConfirmed: 0,
        isGoogleAccount: 0,
        isPremium: 0,
        isAdmin: 0,
        games: 0
      }
    ).then(users => {
      res.status(200).send(users);
    });
  });
};
