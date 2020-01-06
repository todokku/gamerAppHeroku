const { transporter } = require("../config/transporter");
const { verifyToken } = require("../middleware/verifyToken");
const { generateToken } = require("../middleware/generateToken");
const User = require("../model/user");

module.exports = app => {
  app.post("/emailconfirm", generateToken, (req, res) => {
    if (req.body) {
      const { email, token } = req.body;
      const url = `https://gamerapps.herokuapp.com/emailconfirmtoken/${token}`;
      const mailOptions = {
        from: "no.reply.confirm.email@gmail.com",
        to: email,
        subject: "Mail de confirmation",
        html: `<a href="${url}">Merci de cliquer ici pour confirmer votre adresse email.</a>`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else if (info) {
          res.status(200).send({ info: info.response });
          transporter.close();
        }
      });
    }
  });

  app.post("/emailconfirmtoken/:token", verifyToken, (req, res) => {
    if (req.params.token) {
      const token = req.params.token;
      User.findOneAndUpdate(
        { token: token },
        { $set: { isEmailConfirmed: true } },
        { new: true }
      )
        .exec()
        .then(result => {
          if (result) {
            res.redirect("https://gamerapps.herokuapp.com/");
          }
        });
    }
  });
};
