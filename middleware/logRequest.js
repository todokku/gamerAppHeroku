const fs = require("fs");

const logRequest = (req, res, next) => {
  let date = "";
  let log = "";
  if (req.ipInfo.error) {
    date = new Date().toString();
    let clientIP = "";
    if (req.ip === "::ffff:127.0.0.1") {
      clientIP = "localhost";
    }
    log = `${date} : | ${clientIP} | ${req.method} | ${req.url}`;
  } else {
    date = new Date().toString();
    log = `${date} : | ${req.ip} | ${req.ipInfo.city}, ${req.ipInfo.country} | ${req.method} | ${req.url}`;
  }
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Server log problem.");
    }
  });
  next();
};

module.exports = { logRequest };
