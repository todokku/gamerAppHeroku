const { cryptUserPassword } = require("../middleware/cryptPassword");
const { checkLoginDb } = require("../middleware/checkLoginDb");
const { validateFormSignUp } = require("../middleware/validateFormSignUp");
const User = require("../model/user");

module.exports = app => {
  app.post(
    "/signup",
    [checkLoginDb, validateFormSignUp, cryptUserPassword],
    (req, res) => {
      req.body.user.creation_date = new Date();
      req.body.user.isEmailConfirmed = true;
      req.body.user.isGoogleAccount = false;
      req.body.user.isPremium = false;
      let user = new User(req.body.user);
      user
        .save()
        .then(result => {
          res
            .status(200)
            .send({ success: `Utilisateur ${result.name} ajouté avec succès` });
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({ status: 400, error: "Enregistrement échoué" });
        });
    }
  );
};
