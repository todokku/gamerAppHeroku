const { validateFormReminder } = require("../middleware/validateFormReminder");
const { transporterReminder } = require("../config/transporter");
const { verifyTypeAccount } = require("../middleware/google/verifyTypeAccount");
const generator = require("generate-password");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

module.exports = app => {
  app.post(
    "/passremind",
    [validateFormReminder, verifyTypeAccount],
    (req, res) => {
      let { email } = req.body;

      let newPassword = generator.generate({
        length: 10,
        numbers: true
      });

      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          User.findOneAndUpdate(
            { email: email },
            { $set: { password: hash } },
            { new: true }
          )
            .exec()
            .then(user => {
              if (user == null) {
                res.status(404).send({ status: 2 });
              } else {
                let mailOptions = {
                  from: "no.reply.remind.pass@gmail.com",
                  to: email,
                  subject: "Votre nouveau mot de passe",
                  html: `<p>Voici votre nouveau mot de passe : ${newPassword}</p>`
                };
                transporterReminder.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  } else if (info) {
                    res
                      .status(200)
                      .send({
                        success:
                          "Le nouveau mot de passe vous a été envoyé. Logez-vous avec votre nouveau mot de passe."
                      });
                  }
                });
              }
            });
        });
      });
    }
  );
};
