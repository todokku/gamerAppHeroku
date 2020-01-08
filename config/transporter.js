const nodemailer = require("nodemailer");
const {
  nodeMailerUser,
  nodeMailerPass,
  nodeMailerUserRemindPass,
  nodeMailerPassRemindPass
} = require("./security");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: nodeMailerUser,
    pass: nodeMailerPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

const transporterReminder = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: nodeMailerUserRemindPass,
    pass: nodeMailerPassRemindPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = { transporter, transporterReminder };
