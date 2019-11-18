const fs = require("fs");

const protectAgainstHack = (req, res, next) => {
  fs.readFile("loginIpsBlackListed.txt", (err, data) => {
    if (err) throw err;
    if (data !== null) {
      let blackListed = data.toString().split("\n");
      if (blackListed.includes(req.ip)) {
        res.status(403).send("Hacking detected. You've been blacklisted.");
      } else {
        fs.appendFile("loginIps.txt", req.ip + "\n", err => {
          if (err) throw err;
          next();
        });
      }
    }
  });
};

module.exports = { protectAgainstHack };
