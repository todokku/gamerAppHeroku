const validateFormReminder = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(email)) {
    res.status(400).send({ status: 1 });
  } else {
    next();
  }
};

module.exports = { validateFormReminder };
