// emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host:"smtp.gmail.com",
  port:465,
  secure: true,
  auth: {
    user: process.env.EMAIL_MAILER,
    pass: process.env.API_KEY_MAILER
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify().then(()=>{
    console.log("Ready for send emails")
}).catch((error) => {
    console.error("Error occurred during verification:", error);
});

module.exports = {transporter}
