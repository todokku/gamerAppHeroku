const validateFormSignUp = (req, res, next) => {
  const { name, email, password } = req.body.user;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  if (name.length < 5) {
    res
      .status(400)
      .send({
        status: 1,
        error: "Le nom d'utilisateur doit contenir au moins 5 caractères"
      });
  } else if (name.indexOf(" ") === 1) {
    res
      .status(400)
      .send({
        status: 2,
        error: "Le nom d'utilisateur ne peut pas contenir des espaces"
      });
  } else if (!emailRegex.test(email)) {
    res
      .status(400)
      .send({ status: 3, error: "Votre email saisi n'est pas correct" });
  } else if (!passwordRegex.test(password)) {
    res
      .status(400)
      .send({
        status: 4,
        error:
          "Votre mot de passe doit contenir au moins: \n 1. Une chiffre \n 2. Un caractère minuscule \n 3. Un caractère majuscule \n 4. Huit caractères"
      });
  } else {
    next();
  }
};

module.exports = { validateFormSignUp };
