const checkAdmin = (req, res, next) => {
  const { email } = req.body;
  if (email === "admin@gamer.app") {
    next();
  } else {
    res.status(403).send("No authorized");
  }
};

module.exports = { checkAdmin };
