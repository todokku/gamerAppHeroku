const {
  verifyGoogleToken
} = require("../../middleware/google/verifyGoogleToken");
const User = require("../../model/user");

module.exports = app => {
  app.post("/googlelogin", verifyGoogleToken, (req, res) => {
    req.body.password =
      "$2y$10$WNtQ7KWbvsJjYlx648ecDeuEnbzBLfFU0.4L/iYMrM4TnwThsi4hu";
    const { email, password } = req.body;
    User.findOne(
      { email: email, password: password, isGoogleAccount: true },
      { _id: 0, password: 0, "games._id": 0, __v: 0 }
    ).then(googleUser => {
      if (googleUser == null) {
        res
          .status(404)
          .send({ status: 1, error: "Compte Google n'est pas enregistré" });
      } else {
        res.status(200).send(googleUser);
      }
    });
  });
};
