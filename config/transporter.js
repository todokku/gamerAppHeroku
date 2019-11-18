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
  }
});

const transporterReminder = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: nodeMailerUserRemindPass,
    pass: nodeMailerPassRemindPass
  }
});

module.exports = { transporter, transporterReminder };
