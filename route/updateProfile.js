const User = require("../model/user");
const { verifyToken } = require("../middleware/verifyToken");

module.exports = app => {
  app.post("/updateprofile", verifyToken, (req, res) => {
    const { name, photo, age, sex, city, country } = req.body.formUpdateProfile;
    const { email, isGoogleAccount, token } = req.body;
    if (isGoogleAccount) {
      User.findOneAndUpdate(
        { email: email },
        { $set: { age: age, sex: sex, city: city, country: country } },
        {
          projection: {
            _id: 0,
            password: 0,
            "games._id": 0,
            __v: 0
          },
          new: true
        }
      )
        .exec()
        .then(user => {
          if (user) {
            res.status(200).send({ success: user });
          }
        });
    } else {
      User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            name: name,
            photo: photo,
            age: age,
            sex: sex,
            city: city,
            country: country
          }
        },
        {
          projection: {
            _id: 0,
            password: 0,
            "games._id": 0,
            __v: 0
          },
          new: true
        }
      )
        .exec()
        .then(user => {
          user.token = token;
          res.status(200).send({ success: user });
        });
    }
  });
};
