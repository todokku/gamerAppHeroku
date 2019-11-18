const {
  checkGoogleAccount
} = require("../../middleware/google/checkGoogleAccount");
const User = require("../../model/user");

module.exports = app => {
  app.post("/googlesignup", checkGoogleAccount, (req, res) => {
    req.body.user.creation_date = new Date();
    req.body.user.isEmailConfirmed = true;
    req.body.user.isGoogleAccount = true;
    req.body.user.password =
      "$2y$10$WNtQ7KWbvsJjYlx648ecDeuEnbzBLfFU0.4L/iYMrM4TnwThsi4hu";
    req.body.user.isPremium = false;
    const user = new User(req.body.user);
    user
      .save()
      .then(result => {
        res.status(200).send({
          success: `Google utilisateur ${result.name} a été bien ajouté`
        });
      })
      .catch(err => {
        console.log(err);
        res.send(400).send({ status: 2, error: "Enregistrement échoué" });
      });
  });
};
